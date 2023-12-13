import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() req: CreateOrderDto) {
    return await this.ordersService.createOrder(req);
  }

  @Get()
  async getOrders() {
    return await this.ordersService.getOrders();
  }
}
