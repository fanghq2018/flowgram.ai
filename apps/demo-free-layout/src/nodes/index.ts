import { FlowNodeRegistry } from '../typings';
import { StartNodeRegistry } from './start';
import { ServiceTaskNodeRegistry } from './service-task';
import { ParallelRegistry } from './parallel';
import { LoopNodeRegistry } from './loop';
import { LLMNodeRegistry } from './llm';
import { EndNodeRegistry } from './end';
import { WorkflowNodeType } from './constants';
import { ConditionNodeRegistry } from './condition';
import { ComponentNodeRegistry } from './component';
import { CommentNodeRegistry } from './comment';
export { WorkflowNodeType } from './constants';
export const nodeRegistries: FlowNodeRegistry[] = [
  ConditionNodeRegistry,
  StartNodeRegistry,
  EndNodeRegistry,
  LLMNodeRegistry,
  LoopNodeRegistry,
  CommentNodeRegistry,
  ParallelRegistry,
  ServiceTaskNodeRegistry,
  ComponentNodeRegistry,
];

export const visibleNodeRegistries = nodeRegistries.filter(
  (r) => r.type !== WorkflowNodeType.Comment
);
