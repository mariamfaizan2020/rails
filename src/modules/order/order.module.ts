import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './services/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orderMaster } from './entities/orderMaster';
import { companyRep } from '../company/entities/companyRep';
import { CompanyService } from '../company/services/company.service';
import { CompanyModule } from '../company/company.module';
import { orderItem } from './entities/orderItem';

@Module({
  imports:[TypeOrmModule.forFeature([orderMaster,companyRep,orderItem]),
CompanyModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
