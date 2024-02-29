import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantsModule } from './modules/merchants/merchants.module';
import { OtpModule } from './modules/otp/otp.module';
import { CompanyModule } from './modules/company/company.module';
import { OrderModule } from './modules/order/order.module';
import { AuthModule } from './modules/Auth/auth.module';




@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'techno20logy',
    database:'railsdatabase',
    autoLoadEntities:true,
    synchronize:true,
  }),
   MerchantsModule, 
   OtpModule, CompanyModule, OrderModule, 
   AuthModule
  ],
  
})
export class AppModule {}
