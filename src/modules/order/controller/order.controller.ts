import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { orderMasterDto } from '../dtos/orderMaster.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService) {}

    @Post('create/orderMaster')
    createOrderMaster(@Body() orderMasterDto:orderMasterDto) {
        return this.orderService.createOrderMaster(orderMasterDto)
    }
}
