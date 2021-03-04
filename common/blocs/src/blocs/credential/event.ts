export abstract class CredentialEvent {}

export class CredentialListEvent extends CredentialEvent {
  authorization: string;

  constructor(authorization: string) {
    super();

    this.authorization = authorization;
  }
}
