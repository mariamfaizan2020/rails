import { Inject, Injectable } from '@nestjs/common';
import { MerchantsService } from '../merchants/services/merchants/merchants.service';
import { signInParams } from 'src/utils/type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly JwtService:JwtService){};
    
    async generateJWTToken(email:string,id:number,status:string) {
        const payload = { email: email,id:id,status:status };
        console.log("payload",payload)
        console.log(payload.id)
        return {
            access_token: await this.JwtService.signAsync(payload),
        }
}
 
}
