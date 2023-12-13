import { Inject, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderDto) {
    try {
      const order = await this.ordersRepository.create(request);
      console.log('emit');

      await lastValueFrom(
        this.billingClient.emit('order_created', {
          request,
        }),
      );
      return order;
    } catch (err) {
      throw err;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
