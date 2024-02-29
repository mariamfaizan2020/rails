import { IsNotEmpty } from "class-validator";

export class companyRepDto{
    @IsNotEmpty()
    rep_name:string;
    @IsNotEmpty()
    emailAddress:string;
    @IsNotEmpty()
    phoneNo:string;

    paymentTerms:string;
    company_id:number;
    Merchant_id:number;
}