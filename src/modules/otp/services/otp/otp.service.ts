import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { MerchantsService } from 'src/modules/merchants/services/merchants/merchants.service';
import * as crypto from 'crypto'
import { InjectRepository } from '@nestjs/typeorm';
import { otp } from 'src/modules/otp/entities/otp';
import { MoreThan, Repository } from 'typeorm';
import { EmailService } from 'src/modules/otp/utils/EmailService';
import { sendOtpParams } from 'src/utils/type';


@Injectable()
export class OtpService {
    constructor (
      
     @InjectRepository(otp) private otpRepository: Repository<otp>,
      @Inject(forwardRef(()=>MerchantsService)) private readonly MerchantsService:MerchantsService,
      @Inject(forwardRef(()=>EmailService)) private readonly EmailService:EmailService ) {}
  
     async createOTP(id:number) {
      console.log(id)
      console.log("in createOtp")
        const User= await this.MerchantsService.getMerchantById(id)
           delete User.Password;
           console.log("User:",User)
          //  const Merchant_Email= User.EmailAddress;
          //  console.log("uSER",Merchant_Email)
            // Generating Otp
       const defaultExpiryTime = 5;
       const calculatedExpiryTime = new Date (new Date().getTime()+defaultExpiryTime*60000)
      if(!User){
        return 'the Merchant does not exist'
        // const Merchant_Email=User.EmailAddress
        // const generateOtp=crypto.randomBytes(3).toString('hex').toUpperCase()
      }else if(User){
        const Merchant_Email=User.EmailAddress
        const generateOtp=crypto.randomBytes(3).toString('hex').toUpperCase()
        const newUserOtp = this.otpRepository.create({
          Merchant_id:User.Merchant_id,
          OtpCode:generateOtp,
          Expiry_time:calculatedExpiryTime,
          Merchant_Email:User.EmailAddress,


      });
      console.log("hhh",Merchant_Email)
      const saveOtp = this.otpRepository.save(newUserOtp);

       
      try {
        console.log('inside try')
        console.log("email",Merchant_Email);
        console.log("otp",generateOtp)
        await this.EmailService.sendMail(Merchant_Email,'OtpCode',generateOtp);
        return 'Email sent successfully!';
      } catch (error) {
        console.error( 'Error sending email:', error);
        return 'Failed to send email.';
      }
      }else{
        return 'Merchant does not Exist'
      }
       
       
      //  if(otp) {
      //   const newUserOtp = this.otpRepository.create({
      //       Merchant_id:User.Merchant_id,
      //       OtpCode:otp,
      //       Expiry_time:calculatedExpiryTime,


      //   });
            // const saveOtp = this.otpRepository.save(newUserOtp);
           
            // try {
            //   console.log('inside try')
            //   await this.EmailService.sendMail(Merchant_Email,'OtpCode',otp);
            //   return 'Email sent successfully!';
            // } catch (error) {
            //   console.error( 'Error sending email:', error);
            //   return 'Failed to send email.';
            // }
          // }
       }
       
    async verifyOtp (otpDetails:sendOtpParams) {
      console.log("OtpService")
      const findOtp=await
       this
       .otpRepository
       .findOne(
        {where:{Merchant_Email:otpDetails.Email,
          OtpCode:otpDetails.Otp, Expiry_time:MoreThan(new Date())}})
          console.log("findOtp",findOtp)
         if(findOtp){
          console.log('otp found')
           this.MerchantsService.activateMerchant(otpDetails.Email) ;
          return true
         }else {
          console.log('Invalid OTP')
          return false;
         }
        
         
      
     }

    //  verifyOtpByEmail(sendOtpDetails:sendOtpParams){
    //     const findOtp=this.otpRepository.findOne({where:
    //       {Merchant_Email:sendOtpDetails.Email,}})
    //  }
        
      }
 