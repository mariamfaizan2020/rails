import { IsEmail, IsNotEmpty } from "class-validator";

export class MerchantByEmailDto{
    @IsNotEmpty()
    @IsEmail()
    EmailAddress:string;

  
}