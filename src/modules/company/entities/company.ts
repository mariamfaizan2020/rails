import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { companyRep } from "./companyRep";

@Entity({name: 'company'})
export class company {
    @PrimaryGeneratedColumn()
    company_id:number;
    
  
    @Column() 
    company_name:string;
  
    @Column()
    CR_number:string;
  
    @Column()
    VAT_number:string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdDt: Date;

    @OneToMany(()=>companyRep, (companyRep)=>companyRep.company,{ cascade: true })
    companyRep:companyRep
    
}