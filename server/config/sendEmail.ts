import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.RESEND_API) {
  console.log('Provide RESEND_API inside the .env file');
}

const resend = new Resend(process.env.RESEND_API!);

interface SendEmailParams {
  sendTo: string | string[];
  subject: string;
  html: string;
}

const sendEmail = async ({ sendTo, subject, html }: SendEmailParams): Promise<any> => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: sendTo,
      subject,
      html,
    });

    if (error) {
      console.error({ error });
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default sendEmail;

