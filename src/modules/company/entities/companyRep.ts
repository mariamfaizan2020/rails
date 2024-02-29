import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { company } from "./company";
import { orderMaster } from "src/modules/order/entities/orderMaster";
import { merchants } from "src/modules/merchants/entities/Merchant";


@Entity()
export class companyRep {
    @PrimaryGeneratedColumn()
    companyRep_id:number;
    @Column()
    rep_name:string;
    @Column()
    emailAddress:string;
    @Column()
    phoneNo:string;
    @Column()
    paymentTerms: string;
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdDt: Date;
   
    
    @ManyToOne(()=>company , (companies)=>companies.companyRep)
    @JoinColumn({name:'company_id'})
    company:company

    @ManyToOne(()=>merchants,(merchant)=>merchant.companyRep)
    @JoinColumn({name:'Merchant_id'})
    merchant:merchants

    // @OneToOne(()=>merchants)
    // @JoinColumn({name:'Merchant_id'})
    // merchant:merchants

    @OneToMany(()=>orderMaster,(order)=>order.companyRep,{ cascade: true })
   
    order:orderMaster

}