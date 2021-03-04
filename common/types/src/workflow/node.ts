export type WorkflowNode = {
  id: string;
  serviceId: string;
  nodeId: string;
  name: string;
  parameters: Record<string, string>;
  condition: string;
  nextNodes: string[];
};
