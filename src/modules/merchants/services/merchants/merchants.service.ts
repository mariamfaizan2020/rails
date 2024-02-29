import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { merchants } from 'src/modules/merchants/entities/Merchant';
import { comparePasswords, encodePassword } from 'src/utils/bcrypt';
import { MerchantByEmailParams,createMerchantParams, signInParams, verifyOtpParams } from 'src/utils/type';
import { MoreThan, Repository } from 'typeorm';
import { AuthService } from 'src/modules/Auth/auth.service';
import * as crypto from 'crypto'
import { otppassword } from '../../entities/otp.password';
import { EmailService } from 'src/modules/otp/utils/EmailService';
import { OtpService } from 'src/modules/otp/services/otp/otp.service';


@Injectable()
export class MerchantsService {
    constructor(
      
        @InjectRepository(merchants) private merchantRepository: Repository<merchants>,
        @Inject(forwardRef(()=>AuthService)) private readonly AuthService: AuthService, 
        @Inject(forwardRef(()=>EmailService)) private readonly EmailService:EmailService,
        @Inject(forwardRef(()=>OtpService)) private readonly otpService:OtpService,
        @InjectRepository(otppassword) private otpPasswordRepository: Repository<otppassword>
    ){}

  async createMerchant(merchantDetails: createMerchantParams) {
    const Password = encodePassword(merchantDetails.Password)
    console.log(Password)
    const newUser = this.merchantRepository.create({...merchantDetails,Password});
    console.log(newUser.EmailAddress)
    const checkEmail=await this.merchantRepository.findOne({where:{EmailAddress:newUser.EmailAddress}})
    if(!checkEmail){
      console.log('email does not exist')
       await this.merchantRepository.save(newUser );
       console.log("hello")
        const sendOtp=await this.otpService.createOTP(newUser.Merchant_id)
        return sendOtp
    }else{
      console.log('email already in use')
      return 'Email already in use'
    }
    
      
  }

async  getMerchantById(supplierId:number) {
    const User= await this.merchantRepository.findOne({where:{Merchant_id:supplierId} })
    console.log(User)
    if (!User) {
      // const Email= User.EmailAddress;
      throw new HttpException('No Merchant Found',HttpStatus.BAD_REQUEST)
  }
    return User;
    
  }

async activateMerchant(Merchant_Email:string) {
  console.log("activate merchant")
  const merchantToUpdate= await this.getMerchantByEmail(Merchant_Email)
  console.log(merchantToUpdate.status)
  merchantToUpdate.status='Activated'
  try {
    this.merchantRepository.save(merchantToUpdate)
  return 'merchant updated'
    
  }catch (error){
    return 'something went wrong'
  }
  
}

async MerchantSignIN(signInDetails:signInParams) {
  const email=signInDetails.EmailAddress
  const Password=signInDetails.Password
  console.log(email)
   const Merchant= await this.merchantRepository
   .findOne({where:{EmailAddress:email}})
   console.log('merchant')
   console.log(Merchant)
  if(!Merchant) {
    throw new HttpException('Email not found',HttpStatus.BAD_REQUEST)
  }
    else {
      const matched=comparePasswords(Password,Merchant.Password)
      if(matched) {
        console.log('merchant login')

        const token = await this.AuthService.generateJWTToken(email,Merchant.Merchant_id,Merchant.status);
        console.log(token)
        return token
      }else {
        console.log('do not matched')
        throw new HttpException('Invalid email or password',HttpStatus.BAD_REQUEST)
      }

    }
}

async getMerchantByEmail(Merchant_Email:string) {
  // const email=MerchantByEmailDetails.EmailAddress
  console.log("merchant by email")
  console.log(Merchant_Email)
  const Merchant= await this.merchantRepository
  .findOne({where:{EmailAddress:Merchant_Email}})
  console.log(Merchant)
  return Merchant
}

async requestResetPassword(ResetPassDetails:MerchantByEmailParams){
  // console.log(ResetPassDetails)
 const email=ResetPassDetails.EmailAddress
  const user=await this.merchantRepository
  .findOne({where:{EmailAddress:email}})
  // console.log("user",user)
  delete user.Password;
 const Merchant_Email=user.EmailAddress
 const Merchant_id=user.Merchant_id
   // Generating Otp
const defaultExpiryTime = 5;
const calculatedExpiryTime = new Date (new Date().getTime()+defaultExpiryTime*60000)
const otp=crypto.randomBytes(3).toString('hex').toUpperCase()
  console.log("otp",otp)
  if(user && otp){
   console.log("user",user)
   console.log("otp",otp)
      const newUserOtp = this.otpPasswordRepository.create({
          Merchant_id,
          Merchant_Email,
          OtpCode:otp,
          Expiry_time:calculatedExpiryTime,


      });
          const saveOtp = this.otpPasswordRepository.save(newUserOtp);
         
          try {
            await this.EmailService.sendMail(Merchant_Email,'OtpCode',otp);
            return 'Email sent successfully!';
          } catch (error) {
            console.error( 'Error sending email:', error);
            return 'Failed to send email.';
          }
        }

  }

async verifyOtpAndResetPassword(verifyOtpDetails:verifyOtpParams){
 const email=verifyOtpDetails.EmailAddress;
  const otp=verifyOtpDetails.Otp
  const newPass=verifyOtpDetails.newPassword
  const user=await this.otpPasswordRepository
  .findOne({where:{Merchant_Email:email,OtpCode:otp}})
  
   if(!user){
    return "The Email or OTP is not Valid"
  }else if(user && user.Expiry_time>new Date()){
    const newPassword = encodePassword(newPass)
     const Merchant=await this.merchantRepository.findOne({where:{EmailAddress:email}})
     Merchant.Password=newPassword
     return this.merchantRepository.save(Merchant)
  }else{
    return "otp time expired"
  }
}
}





// if(user){
  //    if(user.Expiry_time>(new Date())){
  //   const newPassword = encodePassword(newPass)
  //    const Merchant=await this.merchantRepository.findOne({where:{EmailAddress:email}})
  //    Merchant.Password=newPassword
  //    return this.merchantRepository.save(Merchant)
  
  //  }else{
  //   return "otp time expired"
  //  }  }else{
  //   return 'the Email or Otp is not correct'
  // }