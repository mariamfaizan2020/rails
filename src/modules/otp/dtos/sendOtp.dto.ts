import {IsNotEmpty, IsString } from "class-validator";

export class sendOtpDto {
    @IsString()
    Otp:string;

    @IsNotEmpty()
    Email:string;
}