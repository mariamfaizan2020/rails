// email.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'faizan.sikander@gmail.com',
      to,
      subject,
      text,
    };

    await this.mailerService.sendMail(mailOptions) 

  }


 


}