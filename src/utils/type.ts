export class createMerchantParams {
   First_name:string;
   Last_name:string;
   EmailAddress:string;
   Password:string;
   Phone_no:string;
   Country:string;
   Company_name:string;
   CR_number:string;
   VAT_number:string;
   Website:string;
   National_Address:string;
   Beneficial_FullName:string;
   Beneficial_BankName:string;
   Beneficial_AccountNumber:string;
   Beneficial_BankBranch:string;
}

export class sendOtpParams {
  Otp:string;
  Email:string;
}

export class signInParams {
   EmailAddress:string;
   Password:string;
}

export class companyParams {
   company_name:string;
   CR_number:string;
   VAT_number:string;
}

export class companyRepParams {
    rep_name:string;
    emailAddress:string;
    phoneNo:string;
    paymentTerms:string;
    company_id:number;
    Merchant_id:number;
  }



export class companyRepParamsNew{
   rep_name:string;
   emailAddress:string;
   phoneNo:string;
   paymentTerms:string;
   company_id:number;
   Merchant_id:number;
 
}


export class companyAndRepParams {
   company_name:string;
   CR_number:string;
   VAT_number:string;
   companyRep:companyRepParamsNew;
}
export enum orderStatus {
   ORDERCREATED = 'Order Created',
    ORDERFULLFILLED = 'Order Fulfilled',
}

export class orderItemParams {
   itemName:string;
   quantity:number;
   price:number;
   discount:number;
   
}

export class orderMasterParams {
   orderNo:string;
   orderURL: string;
   orderStatus:orderStatus;
   companyRepId:number;
   merchantId:number;
   items:orderItemParams[]

}

export class MerchantByEmailParams {
   EmailAddress:string;
}

export class verifyOtpParams{
   EmailAddress:string;
   Otp:string;
   newPassword:string;
}