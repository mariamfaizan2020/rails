import { Module, forwardRef } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import { CompanyService} from './services/company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { company } from './entities/company';
import { companyRep } from './entities/companyRep';
import { AuthModule } from '../Auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([company,companyRep]),
  forwardRef(() => AuthModule)
],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports:[CompanyService]
})
export class CompanyModule {}
