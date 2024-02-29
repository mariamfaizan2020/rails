import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { Request } from "express";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService,
        private readonly authService:AuthService){}

        private extractTokenFromHeader(request:Request):string | undefined {
            console.log("request:",request.headers.authorization)
            const [type, token] = request.headers.authorization?.split(' ') ?? [];
            console.log(token)
            return type === 'Bearer' ? token : undefined;
        }
   
        async canActivate(context: ExecutionContext):Promise<boolean>  {
         const request=context.switchToHttp().getRequest()

         const token =this.extractTokenFromHeader(request)
         console.log("token",token)
        if(!token){
            throw new UnauthorizedException();
        }
        try {
            const payload=this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
              )
              request['user'] =await payload;
              console.log("request",request.user.id)

        }catch{
            throw new UnauthorizedException();
        }
        return true;
    }


    
}