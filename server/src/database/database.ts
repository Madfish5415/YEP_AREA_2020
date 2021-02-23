export type DatabaseConfiguration = {
  readonly hostname: string;
  readonly port: number;
  readonly name?: string;
  readonly user?: string;
  readonly password?: string;
};

export class Database {
  readonly hostname: string;
  readonly port: number;
  readonly name?: string;
  private readonly user?: string;
  private readonly password?: string;

  constructor(configuration: DatabaseConfiguration) {
    this.hostname = configuration.hostname;
    this.port = configuration.port;
    this.name = configuration.name;
    this.user = configuration.user;
    this.password = configuration.password;
  }
}
