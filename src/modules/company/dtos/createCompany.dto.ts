import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, ValidateNested } from "class-validator";


export class createCompanyDto {
    @IsNotEmpty()
    company_name:string;
    @IsNotEmpty()
    CR_number:string;
    @IsNotEmpty()
    VAT_number:string;
    
 

    
}