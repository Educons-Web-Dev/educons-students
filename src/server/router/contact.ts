import { z } from 'zod';
import { createRouter } from './context';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const contactRouter = createRouter().mutation('sendMessage', {
  input: z.object({ fullName: z.string(), email: z.string(), message: z.string() }),
  async resolve({ input }) {
    return await sgMail.send({
      from: 'studentskapraksa@educons.edu.rs',
      to: process.env.ADMIN_EMAIL,
      templateId: 'd-ee38cc5e656d47759bf4b51386fe2973',
      dynamicTemplateData: {
        fullName: input.fullName,
        email: input.email,
        message: input.message,
      },
    });
  },
});
