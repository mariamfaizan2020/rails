import { Module, forwardRef } from '@nestjs/common';
import { MerchantsController } from './controllers/merchants/merchants.controller';
import { MerchantsService } from './services/merchants/merchants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { merchants } from 'src/modules/merchants/entities/Merchant';
import { AuthModule } from '../Auth/auth.module';
import {otppassword, } from 'src/modules/merchants/entities/otp.password'
import { OtpModule } from '../otp/otp.module';

@Module({
  imports:[TypeOrmModule.forFeature([merchants,otppassword]),
  forwardRef(() => AuthModule), 
  // OtpModule,AuthModule
  forwardRef(() => OtpModule)
],
  controllers: [MerchantsController],
  providers: [MerchantsService],
  exports: [MerchantsService]
})
export class MerchantsModule {}
