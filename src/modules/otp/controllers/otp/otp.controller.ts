import { Body, Controller, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { sendOtpDto } from 'src/modules/otp/dtos/sendOtp.dto';
import { OtpService } from 'src/modules/otp/services/otp/otp.service';

@Controller('otp')
export class OtpController {
    constructor (private readonly otpService:OtpService) {}
    @Post('/:id') 
 async createOtpForMerchant(@Param('id',ParseIntPipe) id:number) {
           
           const otpData=await this.otpService.createOTP(id)
           return otpData;

    
    }

    @Post('/verify/otp') 
    // @UsePipes(ValidationPipe)
    verifyOtpGivenByMerchant(@Body() sendOtpDto:sendOtpDto) {
        return this.otpService.verifyOtp(sendOtpDto)
    }

    // @Post('/verify')
    // @UsePipes(ValidationPipe)
    // verifyOtpByMerchantEmail(@Body() sendOtpDto:sendOtpDto){
    //    return this.otpService.verifyOtpByEmail(sendOtpDto)
    // }
}
