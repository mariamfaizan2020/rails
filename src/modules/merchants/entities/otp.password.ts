import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'otppassword'})
export class otppassword {
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