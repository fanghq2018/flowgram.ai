import { FlowDocumentJSON } from './typings';

export const initialData: FlowDocumentJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'bpmn:startEvent',
      meta: {
        position: {
          x: 115.08333333333334,
          y: 367.25,
        },
      },
      data: {
        title: 'Start',
        outputs: {
          type: 'object',
          properties: {
            remoji_params: {
              type: 'string',
            },
            init_images: {
              type: 'string',
            },
            detect_params: {
              type: 'string',
            },
          },
        },
      },
    },
    {
      id: 'end_0',
      type: 'bpmn:endEvent',
      meta: {
        position: {
          x: 2220,
          y: 381.75,
        },
      },
      data: {
        title: 'End',
        outputs: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
            },
          },
        },
      },
    },
    {
      id: 'serviceTask_1',
      type: 'bpmn:serviceTask',
      meta: {
        position: {
          x: 597.7083333333334,
          y: 367.25,
        },
      },
      data: {
        title: '图片检测',
        topic: {
          type: 'object',
          properties: {
            'async-formula-task': {
              key: 5,
              name: 'async-formula-task',
              type: 'string',
              extra: {
                index: 1,
              },
            },
          },
          required: [],
        },
        inputs: {
          type: 'object',
          properties: {
            input_media_key: {
              key: 6,
              name: 'input_media_key',
              type: 'string',
              extra: {
                index: 1,
              },
              isPropertyRequired: true,
            },
            input_params_key: {
              key: 7,
              name: 'input_params_key',
              type: 'string',
              extra: {
                index: 2,
              },
              isPropertyRequired: true,
            },
          },
          required: ['input_media_key', 'input_params_key'],
        },
        outputs: {
          type: 'object',
          properties: {
            status_code: {
              key: 14,
              name: 'status_code',
              type: 'string',
              extra: {
                index: 1,
              },
            },
          },
          required: [],
        },
      },
    },
    {
      id: 'condition_1',
      type: 'bpmn:exclusiveGateway',
      meta: {
        position: {
          x: 1080.3333333333335,
          y: 349.75,
        },
      },
      data: {
        title: '检测是否通过',
        conditions: [
          {
            value: {
              type: 'expression',
              content: '',
              left: {
                type: 'ref',
                content: ['serviceTask_1', 'status_code'],
              },
              operator: 'eq',
              right: {
                type: 'constant',
                content: '200',
              },
            },
            key: 'if_jLLNcy',
          },
          {
            value: {
              type: 'expression',
              content: '',
              left: {
                type: 'ref',
                content: ['serviceTask_1', 'status_code'],
              },
              operator: 'neq',
              right: {
                type: 'constant',
                content: '200',
              },
            },
            key: 'if_qQDR9A',
          },
        ],
      },
    },
    {
      id: 'serviceTask_2',
      type: 'bpmn:serviceTask',
      meta: {
        position: {
          x: 1536.4583333333335,
          y: 222.50000000000009,
        },
      },
      data: {
        title: 'remoji_encode',
        topic: {
          type: 'object',
          properties: {
            'async-mtlab-task': {
              key: 15,
              name: 'async-mtlab-task',
              type: 'string',
              extra: {
                index: 1,
              },
            },
          },
          required: [],
        },
      },
    },
    {
      id: 'serviceTask_3',
      type: 'bpmn:serviceTask',
      meta: {
        position: {
          x: 1792.7083333333335,
          y: 464.75,
        },
      },
      data: {
        title: '结果回调',
        topic: {
          type: 'object',
          properties: {
            notify: {
              key: 15,
              name: 'notify',
              type: 'string',
              extra: {
                index: 1,
              },
            },
          },
          required: [],
        },
      },
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'serviceTask_1',
    },
    {
      sourceNodeID: 'serviceTask_1',
      targetNodeID: 'condition_1',
    },
    {
      sourceNodeID: 'condition_1',
      targetNodeID: 'serviceTask_2',
      sourcePortID: 'if_jLLNcy',
    },
    {
      sourceNodeID: 'condition_1',
      targetNodeID: 'serviceTask_3',
      sourcePortID: 'if_qQDR9A',
    },
    {
      sourceNodeID: 'serviceTask_2',
      targetNodeID: 'serviceTask_3',
    },
    {
      sourceNodeID: 'serviceTask_3',
      targetNodeID: 'end_0',
    },
  ],
};
