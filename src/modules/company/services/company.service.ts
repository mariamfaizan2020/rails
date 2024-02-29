import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { companyAndRepParams, companyParams, companyRepParams } from 'src/utils/type';
import { company } from '../entities/company';
import { MongoChangeStreamError, Repository } from 'typeorm';
import { companyRep } from '../entities/companyRep';
import { merchants } from 'src/modules/merchants/entities/Merchant';
import { createDiffieHellmanGroup } from 'crypto';
import { AuthService } from 'src/modules/Auth/auth.service';
import { AuthGuard } from 'src/modules/Auth/auth.guard';
import { Request } from 'express';


@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(company) private companyRepository: Repository<company>,
        @InjectRepository(companyRep) private companyRepRepository: Repository<companyRep>,
        @Inject('REQUEST') private readonly request: Request
       
        ){}
  

   async createCompany(companyDetails:companyParams) {
        const newCompany=this.companyRepository.create(companyDetails)
        console.log(newCompany);
        const createdCompany = await this.companyRepository.save(newCompany );
        return createdCompany;
    }


    createCompanyRep(companyRepDetails:companyRepParams) {
       
        const newRepresentative=this.companyRepRepository.create(companyRepDetails)
        console.log(newRepresentative);
       
        
        return this.companyRepRepository.save(newRepresentative );}

   async getRepById(RepId:number) {
      const companyRep=await this.companyRepRepository
      .findOne({
        where:{companyRep_id:RepId},
        relations:{
            merchant:true
        }
    });
      if(!companyRep)
      throw new HttpException('NO representative found',HttpStatus.BAD_REQUEST);
    return companyRep;
    }

    async getCompanyByName(company_name:string) {
           const company=await this.companyRepository.findOne({where:{company_name} })
          console.log(company)
          return company;
     }



     async createCompanyAndRep(companyAndRepDetails:companyAndRepParams,userData) {
        if(userData.status==='Activated'){
            console.log("hello")
            const company=await this.checkCRRegistration(companyAndRepDetails.CR_number)
            console.log('company',company)
           
            console.log ("user",userData)
            const status=userData.status
            console.log("status",status)
            
            
    
            
           
          
            if(company==0){
                try {
                    const company={
                        company_name:companyAndRepDetails.company_name,
                        CR_number:companyAndRepDetails.CR_number,
                        VAT_number:companyAndRepDetails.VAT_number
                    }
            const createCompany= this.companyRepository.save(company)
    
            const rep={
                rep_name:companyAndRepDetails.companyRep.rep_name,
                emailAddress:companyAndRepDetails.companyRep.emailAddress,
                phoneNo:companyAndRepDetails.companyRep.phoneNo,
                paymentTerms:companyAndRepDetails.companyRep.paymentTerms,
                company:{
                    company_id:(await createCompany).company_id
                },
                merchant:{
                    Merchant_id:userData.id
                }
            }
            console.log(rep)
            const createRep=await this.companyRepRepository.save(rep)
          console.log("hello:",createRep)
         
                    }catch (error) {
                        // Handle the exception here
                        console.error("Error occurred while creating company and representative:", error);
                        throw error; // Re-throw the error for upper layers to handle if needed
                    }      
                }
               
          
            else {
                console.log("company already exist")
               
                    const rep = {
                        rep_name:companyAndRepDetails.companyRep.rep_name,
                        emailAddress:companyAndRepDetails.companyRep.emailAddress,
                        phoneNo:companyAndRepDetails.companyRep.phoneNo,
                        paymentTerms:companyAndRepDetails.companyRep.paymentTerms,
                        company:{
                            company_id:company
                        },
                        merchant:{
                            Merchant_id:userData.id
                        }
                    }
                    
                    await this.companyRepRepository.create(rep);
    
             
                await this.companyRepRepository.save(rep );
            
            }
        }else{
            return "The user is not Activated yet"
        }
        
     }
    

   async  checkCRRegistration(crNo:string) {
        const companyExist=await this.companyRepository.findOne({where:{CR_number:crNo}})
        console.log(companyExist)
        if(!companyExist){
            console.log('company does not exist')
            return 0;
        } else{
            console.log('company already registered')
        return companyExist.company_id;
    }
       
     }

     private extractTokenFromHeader(request:Request):string | undefined {
        console.log("request:",request.headers.authorization)
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        console.log(token)
        return type === 'Bearer' ? token : undefined;
    }

}


