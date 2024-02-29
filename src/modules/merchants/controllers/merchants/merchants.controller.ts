import { Body, Controller, Get, Inject, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'http';
import { createMerchantDto } from 'src/modules/merchants/dtos/createMerchant.dto';
import { MerchantsService } from 'src/modules/merchants/services/merchants/merchants.service';
import { signInDto } from '../../dtos/signIn.dto';
import { AuthService } from 'src/modules/Auth/auth.service';
import { AuthGuard } from 'src/modules/Auth/auth.guard';
import { MerchantByEmailDto } from '../../dtos/MerchantByEmail.';

import { verifyOtpDto } from '../../dtos/verifyOtp.dto';

@Controller('merchants')
export class MerchantsController {
    constructor (
        // @Inject('MERCHANT_SERVICE') 
        private readonly merchantService:MerchantsService,
     
    ) {}
  
    @Post('create')
    @UsePipes(ValidationPipe)
    createMerchant(@Body() createMerchantDto:createMerchantDto) {
        return this.merchantService.createMerchant(createMerchantDto)
    }
   
   @Post('signIn')
//    @UseGuards(AuthGuard)
   signIn(@Body() signInDto:signInDto) {
    console.log('in merchant controller')
      return this.merchantService.MerchantSignIN(signInDto);
   }
    
//    @Post('login')
//    getMerchantByEmail(@Body() MerchantByEmailDto:MerchantByEmailDto){
//     return this.merchantService.getMerchantByEmail(MerchantByEmailDto)
//    }
   
   @Post('reqResetPass')
   requestResetPassword(@Body() ResetPassDto:MerchantByEmailDto){
    return this.merchantService.requestResetPassword(ResetPassDto)
   }

   @Post('verifyOtp')
   verifyOtp(@Body() verifyOtpDto:verifyOtpDto){
    return this.merchantService.verifyOtpAndResetPassword(verifyOtpDto)
   }
}
