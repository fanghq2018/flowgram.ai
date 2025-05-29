import { nanoid } from 'nanoid';

import { FlowNodeRegistry } from '../../typings';
import iconCondition from '../../assets/icon-condition.svg';
import { formMeta } from './form-meta';
import { WorkflowNodeType } from '../constants';

export const ServiceTaskNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.ServiceTask,
  info: {
    icon: iconCondition,
    description:
      'Connect multiple downstream branches. Only the corresponding branch will be executed if the set conditions are met.',
  },
  meta: {
    defaultPorts: [{ type: 'input' }, { type: 'output' }],
    // Condition Outputs use dynamic port
    useDynamicPort: false,
    expandable: false, // disable expanded
  },
  formMeta,

  onAdd() {
    return {
      id: `serviceTask_${nanoid(5)}`,
      type: 'serviceTask',
      data: {
        title: '外部任务',
      },
    };
  },
};
