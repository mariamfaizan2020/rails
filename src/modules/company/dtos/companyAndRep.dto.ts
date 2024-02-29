import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, ValidateNested } from "class-validator";

export class companyRepDtoNew{
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

export class CompanyAndRepDto {
    @IsNotEmpty()
    company_name:string;
    @IsNotEmpty()
    CR_number:string;
    @IsNotEmpty()
    VAT_number:string;
    @ValidateNested({ each: true })
    @Type(() =>companyRepDtoNew )
    companyRep:companyRepDtoNew;

    
}