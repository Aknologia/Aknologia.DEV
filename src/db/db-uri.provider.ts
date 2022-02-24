import { ConfigService } from '@nestjs/config';

export class UriProvider {
  private username = process.env.DB_USERNAME;
  private password = process.env.DB_PASSWORD;

  private cluster = process.env.DB_CLUSTER;

  constructor(configService?: ConfigService) {
    if (configService) {
      this.username = configService.get<string>('DB_USERNAME');
      this.password = configService.get<string>('DB_PASSWORD');
      this.cluster = configService.get<string>('DB_CLUSTER');
    } else {
      this.username = process.env.DB_USERNAME;
      this.password = process.env.DB_PASSWORD;
      this.cluster = process.env.DB_CLUSTER;
    }
  }

  public getMain(): string {
    return `mongodb+srv://${this.username}:${this.password}@${this.cluster}/main?retryWrites=true&w=majority`;
  }

  public getSession(): string {
    return `mongodb+srv://${this.username}:${this.password}@${this.cluster}/session?retryWrites=true&w=majority`;
  }
}
