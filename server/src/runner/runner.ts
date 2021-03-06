import { BaseNode, BaseTriggerNode } from "@area-common/service";
import { Node, Runner, RunnerNode, Workflow } from "@area-common/types";

import {
  CREDENTIAL_NOT_EXISTS_ERROR,
  SERVICE_NODE_NOT_EXISTS,
} from "../constants";
import { LinearNode, ParallelNode } from "../node";
import { CredentialRepository, ServiceRepository } from "../repositories";
import { BaseRunnerNode } from "./node";
import { BaseRunnerTriggerNode } from "./trigger";

export class BaseRunner implements Runner {
  readonly nodes: Node[];

  constructor(nodes: Node[]) {
    this.nodes = nodes;
  }

  start(): void {
    for (const node of this.nodes) {
      if (node instanceof BaseRunnerTriggerNode) {
        node.subscribeAll(node.parameters);
      } else {
        node.execute();
      }
    }
  }

  stop(): void {
    for (const node of this.nodes) {
      if (node instanceof BaseRunnerTriggerNode) {
        node.unsubscribeAll(node.parameters);
      }
    }
  }

  static async fromWorkflow(
    workflow: Workflow,
    credentialRepository: CredentialRepository,
    serviceRepository: ServiceRepository
  ): Promise<BaseRunner> {
    const rNodes: RunnerNode[] = [];

    for (const wNode of workflow.nodes) {
      const node = serviceRepository.readNode(wNode.serviceId, wNode.nodeId);

      if (!node) throw SERVICE_NODE_NOT_EXISTS;

      let parameters = wNode.parameters;

      if (node.credentials) {
        const filter = {
          userId: workflow.userId,
          serviceId: wNode.serviceId,
        };

        const credential = await credentialRepository.read(filter);

        if (!credential) {
          throw CREDENTIAL_NOT_EXISTS_ERROR;
        }

        parameters = {
          ...parameters,
          ...JSON.parse(credential.value),
        };
      }

      let rNode: RunnerNode | undefined;

      if (node instanceof BaseTriggerNode) {
        rNode = new BaseRunnerTriggerNode(
          wNode.id,
          node,
          parameters,
          wNode.condition,
          wNode.nextNodes
        );
      } else {
        rNode = new BaseRunnerNode(
          wNode.id,
          node as BaseNode,
          parameters,
          wNode.condition,
          wNode.nextNodes
        );
      }

      rNodes.push(rNode);
    }

    const rStartersNodes = rNodes.filter((rNode) => {
      return workflow.starters.includes(rNode.id);
    });
    const rStartersTrees = rStartersNodes.map((rNode) => {
      return BaseRunner.createNodeTree(rNode, rNodes);
    });

    return new BaseRunner(rStartersTrees);
  }

  static createNodeTree(node: RunnerNode, allNodes: RunnerNode[]): Node {
    if (!node.nextNodes.length) {
      return node;
    }

    const subNodes = allNodes.filter((item) => {
      return node.nextNodes.includes(item.id);
    });
    const subTree = subNodes.map((item) => {
      return BaseRunner.createNodeTree(item, allNodes);
    });
    const parallelNode = new ParallelNode(subTree);

    if (node instanceof BaseRunnerTriggerNode) {
      node.subscribers.push(parallelNode);

      return node;
    }

    return new LinearNode([node, parallelNode]);
  }
}
