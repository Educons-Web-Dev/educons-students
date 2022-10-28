import { z } from 'zod';
import { tokenGen } from '../../utils/tokenGen';
import { createRouter } from './context';
import sgMail from '@sendgrid/mail';
import { TRPCError } from '@trpc/server';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const getPath = () => {
  if (process.env.VERCEL_URL) return 'https://educons-students.vercel.app';

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const newsletterRouter = createRouter()
  .mutation('subscribe', {
    input: z.object({ email: z.string() }),
    async resolve({ ctx, input }) {
      const foundSubscription = await ctx.prisma.newsletter.findUnique({
        where: {
          email: input.email,
        },
      });

      if (foundSubscription) return;

      const newSubscription = await ctx.prisma.newsletter.create({
        data: {
          email: input.email,
          token: tokenGen(),
        },
      });

      await sgMail.send({
        from: 'studentskapraksa@educons.edu.rs',
        to: newSubscription.email,
        templateId: 'd-9234b290bb0e4d6a8403dcf8c77afbab',
        dynamicTemplateData: {
          newsUrl: `${getPath()}/news`,
        },
      });

      return newSubscription;
    },
  })
  .mutation('unsubscribe', {
    input: z.object({ token: z.string(), email: z.string() }),
    async resolve({ ctx, input }) {
      const foundSubscription = await ctx.prisma.newsletter.findFirst({
        where: {
          token: input.token,
        },
      });

      if (!foundSubscription) throw new TRPCError({ code: 'BAD_REQUEST', message: 'subscription not found' });

      return await ctx.prisma.newsletter.delete({
        where: {
          email: input.email,
        },
      });
    },
  });
