import { companyRep } from "src/modules/company/entities/companyRep";
import { merchants } from "src/modules/merchants/entities/Merchant";
import { orderStatus } from "src/utils/type";
import { ArrayElement, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { orderItem } from "./orderItem";

@Entity()
export class orderMaster {
   
  
    @PrimaryGeneratedColumn()
    order_Id:number;

    @Column()
    orderNo:string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdDt: Date;

    
    @Column({ nullable: true })
    orderURL: string;

    @Column({default:orderStatus.ORDERCREATED,nullable:true}) 
    orderStatus:orderStatus;

    @Column({ nullable: true })
    orderReference:string;
   
    @Column({ nullable: true })
    orderNotes:string;

    

    @ManyToOne(()=>merchants,(merchant)=>merchant.order)
    @JoinColumn({name:'merchant_id'})
     merchant:merchants;

     @ManyToOne(()=>companyRep,(companyRep)=>companyRep.order)
     @JoinColumn({name:'companyRep_id'})
     companyRep:companyRep;
    
     @OneToMany(()=>orderItem,(orderItem)=>orderItem.order,  {cascade : true})
      orderItem:orderItem[] 
   
    }