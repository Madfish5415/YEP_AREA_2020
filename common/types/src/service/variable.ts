export enum Type {
  ANY = "any",
  BOOLEAN = "boolean",
  NUMBER = "number",
  STRING = "string",
}

export type Variable = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly type: Type;
  readonly regex?: string;
}
