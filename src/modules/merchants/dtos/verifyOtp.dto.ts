import { IsEmail, IsNotEmpty } from "class-validator";

export class verifyOtpDto{
    @IsNotEmpty()
    @IsEmail()
    EmailAddress:string;

    @IsNotEmpty()
    Otp:string;

    newPassword:string;

  
}