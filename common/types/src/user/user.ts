export type User = {
  readonly id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  administrator: boolean;
};
