export enum WorkflowNodeType {
  Start = 'bpmn:startEvent',
  End = 'bpmn:endEvent',
  LLM = 'llm',
  Condition = 'bpmn:exclusiveGateway',
  Loop = 'loop',
  Comment = 'comment',
  Parallel = 'parallel',
  ServiceTask = 'bpmn:serviceTask',
  Component = 'component',
}
