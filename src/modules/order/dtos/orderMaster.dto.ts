import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { orderStatus } from "src/utils/type";

export class orderItemDto {
   
    itemName:string;
    quantity:number;
    price:number;
    discount:number;
    
}

export class orderMasterDto {
   
    orderNo:string;
    orderURL: string;
    orderStatus:orderStatus;
    orderReference:string;
    orderNotes:string;
    companyRepId:number;
    merchantId:number;
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => orderItemDto)
    items:orderItemDto[];




}