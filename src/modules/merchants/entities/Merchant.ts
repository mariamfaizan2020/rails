import { companyRep } from "src/modules/company/entities/companyRep";
import { orderMaster } from "src/modules/order/entities/orderMaster";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'merchants'})
export class merchants {

//Merchant details
  @PrimaryGeneratedColumn()
  Merchant_id:number;

  @Column()
  First_name:string;

  @Column()
  Last_name:string;

  @Column()
  Full_name:string;

  @Column()
  EmailAddress:string;

  @Column()
  Password:string;

  @Column()
  Phone_no:string;

  @Column()
  Country:string;

//company details
  @Column()
  Company_name:string;

  @Column()
  CR_number:string;

  @Column()
  VAT_number:string;

  @Column()
  Website:string;

  @Column()
  National_Address:string;
  
//payment detail
  @Column()
  Beneficial_FullName:string;

  @Column()
  Beneficial_BankName:string;

  @Column()
  Beneficial_AccountNumber:string;

  @Column()
  Beneficial_BankBranch:string;

  @Column({default:'pending'})
  status:string;

  @OneToMany(()=>orderMaster,(order)=>order.merchant,{ cascade: true })
  order:orderMaster
  id: number;

  @OneToMany(()=>companyRep,(representative)=>representative.merchant,{ cascade: true })
  companyRep:companyRep 
}