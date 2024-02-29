import { Module, forwardRef } from '@nestjs/common';
import { OtpController } from './controllers/otp/otp.controller';
import { OtpService } from './services/otp/otp.service';
import { MerchantsService } from 'src/modules/merchants/services/merchants/merchants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { merchants } from 'src/modules/merchants/entities/Merchant';
import { otp } from 'src/modules/otp/entities/otp';
import { EmailService } from './utils/EmailService';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from '../Auth/auth.module';
import { MerchantsModule } from '../merchants/merchants.module';



@Module({
  //imports:[MerchantsService],
  imports:[TypeOrmModule.forFeature([merchants,otp]),MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      auth: {
        user: 'faizan.sikander@gmail.com',
        pass: 'dryi tjil psxg vxmv'

      }
    }
  }),forwardRef(() => AuthModule),
  forwardRef(() => MerchantsModule)
],
  controllers: [OtpController],
  providers: [OtpService,EmailService,],
  exports:[OtpService,EmailService]
})
export class OtpModule {}
