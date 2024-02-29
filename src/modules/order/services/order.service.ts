import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { orderMaster } from '../entities/orderMaster';
import { Repository } from 'typeorm';
import { orderItemParams, orderMasterParams } from 'src/utils/type';
import * as crypto from 'crypto'
import { CompanyService } from 'src/modules/company/services/company.service';
import { companyRep } from 'src/modules/company/entities/companyRep';
import { orderItem } from '../entities/orderItem';
import { orderMasterDto } from '../dtos/orderMaster.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(orderMaster) private orderMasterRepository: Repository<orderMaster>,
        @InjectRepository(orderItem) private orderItemRepository: Repository<orderItem>,
        private readonly companyService: CompanyService
    ) { }

//     async createOrder(orderMasterDetails: orderMasterParams) {

//         const orderNo = crypto.randomBytes(3).toString('hex').toUpperCase()

             
//                 const companyRep = await this.companyService.getRepById(orderMasterDetails.companyRepId);
//                 const merchantId = companyRep.Merchant.id;
//                 const order = {
//                     orderNo: orderNo,
//                     orderURL: "",
//                     merchant: {
//                         id:merchantId
//                     },
//                     companyRep: {
//                         companyRep_id:orderMasterDetails.companyRepId
//                     }
//                 }
//                 const newOrder = this.orderMasterRepository.create(order);
//                 console.log(order)

        

//         // let orderItemsData1 = createOrderMstDto;

//         const items=orderMasterDetails.items.map(item=>{
//                       const totalPrice=item.price*item.quantity
//                     const fees = 5;
//                    const feeAmt = (totalPrice*fees) / 100;
//                       const discount = item.discount;
//                         const discAmt = (totalPrice * discount) / 100;
//                      const amount = (totalPrice + feeAmt - discAmt);
            
//                       const newItem= this.orderItemRepository.create({...item,fees,amount})
//                     console.log(newItem);

          

//         } 

//         );

         
//          newOrder.itemDtl = items;

//         console.log(items)

//         console.log(newOrder)


//         await this.orderMasterRepository.save(newOrder);

//         return newOrder;   





//     }
// }
    async createOrderMaster(orderMasterDetails: orderMasterParams) {
        const orderNo = crypto.randomBytes(3).toString('hex').toUpperCase()

        // console.log(orderNo);
        const companyRep = await this.companyService.getRepById(orderMasterDetails.companyRepId);
        const merchantId = companyRep.merchant.Merchant_id;
        const order = {
            
            orderNo: orderNo,
            orderURL: "",
            merchant: {
                Merchant_id:merchantId
            },
            companyRep: {
                companyRep_id:orderMasterDetails.companyRepId
            }
        }
       

        const items= orderMasterDetails.items.map( item => {
           
            const totalPrice = item.price * item.quantity;
            const fees = 5;
            const feeAmt = (totalPrice * fees) / 100;
            const discount = item.discount;
            const discAmt = (totalPrice * discount) / 100;
            const amount = (totalPrice + feeAmt - discAmt);

           

            return  {
                itemName: item.itemName,
                quantity: item.quantity,
                price: item.price,
                discount: item.discount,
                fees: fees,
                amount: amount,
                // order_Id:newOrder.order_Id
                
            };
            
        });





     const newOrder =  this.orderMasterRepository.create({...order, orderItem : items});
            // console.log("newOrder:",newOrder)
        
        // console.log(items)
        
      
        // console.log();
        const finalOrder= await this.orderMasterRepository.save(newOrder)
        console.log("order:",finalOrder);
        console.log("id:",finalOrder.order_Id)
        
        return finalOrder;
       

    }catch (error: any) {
        console.error("Error creating order master:", error);
        throw error;
    }
}

;