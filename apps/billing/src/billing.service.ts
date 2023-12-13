import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  private logger = new Logger(BillingService.name);
  getHello(): string {
    return 'Hello World!';
  }
  bill(data: any) {
    this.logger.log('billing ...');
    console.log(data);
    return data;
  }
}
