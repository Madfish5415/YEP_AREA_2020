import { Any, AnyObject, CollectionNode, Node } from "@area-common/types";

export class LinearNode<P extends AnyObject = AnyObject>
  implements CollectionNode<P, void> {
  collection: Node<P>[];

  constructor(collection: Node<P>[]) {
    this.collection = collection;
  }

  async execute(parameters?: P): Promise<void> {
    let outputs: Any = parameters;

    for (const node of this.collection) {
      if (outputs instanceof Array) {
        for (const output of outputs) {
          outputs = await node.execute(output);
        }
      } else {
        outputs = await node.execute(outputs);
      }
    }
  }
}
