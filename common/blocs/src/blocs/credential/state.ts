export abstract class CredentialState {}

export class CredentialInitialState extends CredentialState {}

export class CredentialLoadingState extends CredentialState {}

export class CredentialErrorState extends CredentialState {}

export class CredentialListState extends CredentialState {
  credentials: string[];

  constructor(credentials: string[]) {
    super();

    this.credentials = credentials;
  }
}
