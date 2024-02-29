import { IsEmail, IsNotEmpty, IsString, Matches, } from "class-validator";

export class createMerchantDto {

    @IsNotEmpty()
    First_name:string;
  
    @IsNotEmpty()
    Last_name:string;
   
    @IsNotEmpty()
    @IsEmail()
    EmailAddress:string;

    @IsNotEmpty()
    Password:string;
  
    @IsNotEmpty()
    Phone_no:string;
  
    @IsNotEmpty()
    Country:string;
    
    @IsNotEmpty()
    Company_name:string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^[0-9]{10}$/)
    CR_number:string;
  
    VAT_number:string;
  
    @IsNotEmpty()
    Website:string;

    @IsNotEmpty()
    National_Address:string;
    
    @IsNotEmpty()
    Beneficial_FullName:string;
  
    @IsNotEmpty()
    Beneficial_BankName:string;
  
    @IsNotEmpty()
    Beneficial_AccountNumber:string;

    Beneficial_BankBranch:string;
  }


