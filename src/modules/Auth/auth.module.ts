import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { MerchantsModule } from '../merchants/merchants.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports:[
    PassportModule,
    forwardRef(() => MerchantsModule),
    JwtModule.register({  
      global:true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },

  })],
  providers: [AuthService,AuthGuard],
  exports:[AuthService,AuthGuard]
})
export class AuthModule {}
