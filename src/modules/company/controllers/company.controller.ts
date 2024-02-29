import { Body, Controller, Get, Inject, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createCompanyDto } from '../dtos/createCompany.dto';
import { CompanyService } from '../services/company.service';
import { companyRepDto } from '../dtos/companyRep.dto';
import { CompanyAndRepDto } from '../dtos/companyAndRep.dto';
import { AuthGuard } from 'src/modules/Auth/auth.guard';
import { Request } from 'express';



@Controller('company')
export class CompanyController {
    constructor(private readonly companyService:CompanyService,
      @Inject('REQUEST') private readonly request: Request
        ) {}
    @Post('create')
    @UsePipes(ValidationPipe)
createCompany(@Body() createCompanyDto:createCompanyDto) {
  return this.companyService.createCompany(createCompanyDto);
}


@Post('createRep')
@UsePipes(ValidationPipe)
createCompanyRep(@Body() companyRepDto:companyRepDto) {
return this.companyService.createCompanyRep(companyRepDto);
}

@Post('companyNRep')
@UseGuards(AuthGuard)
@UsePipes(ValidationPipe)
async createCompanyAndRep(@Body() CompanyAndRepDto:CompanyAndRepDto) {
  const userData = this.request.user;
return await this.companyService.createCompanyAndRep(CompanyAndRepDto,userData);
}





}



