import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'otp'})
export class otp {
    @PrimaryGeneratedColumn()
    Otp_id:number;
  
    @Column()
    Merchant_id:number;

    @Column()
    Merchant_Email:string;
  
    @Column()
    OtpCode:string;
  
    @Column()
    Expiry_time: Date;
}