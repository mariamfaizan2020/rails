import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { orderMaster } from "./orderMaster";

@Entity()
export class orderItem{
 @PrimaryGeneratedColumn()
 orderItemId:number;

 @Column()
 itemName:string;

 @Column()
 quantity:number;

 @Column()
 price:number;

 @Column()
 discount:number;

 @Column()
 fees:number;

 @Column()
 amount:number;




 @ManyToOne(()=>orderMaster,(order)=>order.orderItem, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
 @JoinColumn({name:'order_Id'})
 order:orderMaster
 
}