import { IsEmail, IsNotEmpty } from "class-validator";

export class signInDto{
    @IsNotEmpty()
    @IsEmail()
    EmailAddress:string;

    @IsNotEmpty()
    Password:string;
}