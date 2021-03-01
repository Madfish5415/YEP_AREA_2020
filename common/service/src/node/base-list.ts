import { Any, Node } from "@area-common/types";
import { BaseNode } from "./base";
import { ListNode } from "@area-common/types/build/service/list";

export abstract class BaseListNode<P = Any, O = Any>
  extends BaseNode<P, O>
  implements ListNode<P, O> {
  abstract readonly list: Node[];

  async execute(parameters?: P): Promise<O> {
    let result: Any = parameters;

    for (const node of this.list) {
      result = node.execute(result);
    }

    return result;
  }
}
