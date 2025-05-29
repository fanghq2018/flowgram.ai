import { BPMNAdapter, BpmnElement } from '@logicflow/extension';
import { LogicFlow } from '@logicflow/core';
import { WorkflowJSON } from '@flowgram.ai/free-layout-editor';

export const extraProps = {
  transformer: {
    'bpmn:startEvent': {
      out(data: any) {
        return data;
      },
    },
    'bpmn:sequenceFlow': {
      out(data: any) {
        const {
          properties: { expressionType, condition },
        } = data;
        if (condition) {
          if (expressionType === 'cdata') {
            return {
              json: `<bpmn:conditionExpression xsi:type="bpmn2:tFormalExpression"><![CDATA[\${${condition}}]]></bpmn:conditionExpression>`,
            };
          }
          return {
            json: `<bpmn:conditionExpression xsi:type="bpmn2:tFormalExpression">${condition}</bpmn:conditionExpression>`,
          };
        }
        return {
          json: '',
        };
      },
    },
    // The returned data is merged into the properties attribute of the parent element bpmn:sequenceFlow
    'bpmn:conditionExpression': {
      in(_key: string, data: any) {
        let condition = '';
        let expressionType = '';
        if (data['#cdata-section']) {
          expressionType = 'cdata';
          condition = /^\$\{(.*)\}$/g.exec(data['#cdata-section'])?.[1] || '';
        } else if (data['#text']) {
          expressionType = 'normal';
          condition = data['#text'];
        }
        return {
          '-condition': condition,
          '-expressionType': expressionType,
        };
      },
    },
    'bpmn:serviceTask': {
      out(data: any) {
        debugger;
        if (data.properties && data.properties.topic) {
          let { topic } = data.properties;
          let topicName = Object.keys(topic.properties)[0];
          data.properties = {
            'camunda:type': 'external',
            'camunda:topic': topicName,
          };
        }
        return data;
      },
    },
  },
};

LogicFlow.use(BPMNAdapter, extraProps);
LogicFlow.use(BpmnElement);

export function convertToBPMN(flowgramJSON: WorkflowJSON) {
  const lf = new LogicFlow({
    container: document.createElement('div'),
  });

  let { nodes, edges } = flowgramJSON;
  let index = 0;
  let data = {
    nodes: nodes.map((node) => {
      let {
        id,
        type,
        meta: {
          position: { x, y },
        },
        data,
      } = node;
      return { id, type, x, y, text: { x, y, value: data.title }, properties: { ...data } };
    }),
    edges: edges.map((edge) => {
      edge.type = 'bpmn:sequenceFlow';
      edge.id = 'id' + index++;
      edge.targetNodeId = edge.targetNodeID;
      edge.sourceNodeId = edge.sourceNodeID;
      delete edge.targetNodeID;
      delete edge.sourceNodeID;
      return edge;
    }),
  };
  let newData;
  lf.adapterIn = function (userData) {
    newData = userData;
    return newData;
  };
  lf.render(data);
  console.log('Logicflow JSON  ----  ' + newData);
  let graphData = lf.getGraphData(newData);
  console.log('BPMN xml is ----  ' + graphData);
  return graphData;
}

export function downloadBPMN(xmlData: string, filename = 'workflow.bpmn') {
  const blob = new Blob([xmlData], { type: 'application/xml' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
