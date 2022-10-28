import { createRouter } from './context';
import sgMail from '@sendgrid/mail';
import { z } from 'zod';
import { validateEmail } from '../../utils/validators';
import { TRPCError } from '@trpc/server';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const getPath = () => {
  if (process.env.VERCEL_URL) return 'https://educons-students.vercel.app';

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const userRouter = createRouter()
  .mutation('invite', {
    input: z.object({ email: z.string() }),
    async resolve({ input: { email }, ctx }) {
      if (!ctx?.session?.user?.isAdmin) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const isValidEmail = validateEmail(email);

      if (!isValidEmail) throw new TRPCError({ message: 'email is not valid', code: 'BAD_REQUEST' });

      const foundInvitation = await ctx.prisma.invitation.findUnique({
        where: { email },
      });

      if (foundInvitation || email === process.env.ADMIN_EMAIL)
        throw new TRPCError({ message: 'user already invited', code: 'BAD_REQUEST' });

      const invitation = await ctx.prisma.invitation.create({
        data: { email },
      });

      await sgMail.send({
        from: 'studentskapraksa@educons.edu.rs',
        to: email,
        templateId: 'd-b24b9b0e5b5f4b32b57bba0c659cac6a',
        dynamicTemplateData: {
          register_url: `${getPath()}/auth`,
        },
      });

      return invitation;
    },
  })
  .query('all', {
    input: z.object({ page: z.number(), size: z.number(), search: z.string() }),
    async resolve({ input: { page, size, search }, ctx }) {
      if (!ctx?.session?.user?.isAdmin) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const users = await ctx.prisma.$transaction([
        ctx.prisma.user.findMany({
          skip: (page - 1) * size,
          take: size,
          where: {
            name: { contains: search },
          },
        }),
        ctx.prisma.user.count(),
      ]);

      return users;
    },
  })
  .query('getAdmins', {
    async resolve({ ctx }) {
      if (!ctx?.session?.user?.isAdmin) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const admins = await ctx.prisma.admin.findMany();

      return admins;
    },
  })
  .mutation('promote', {
    input: z.object({ email: z.string() }),
    async resolve({ input: { email }, ctx }) {
      if (ctx.session?.user?.email !== process.env.ADMIN_EMAIL) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const foundUser = await ctx.prisma.user.findUnique({
        where: { email },
      });

      if (!foundUser) throw new TRPCError({ message: 'user not found', code: 'BAD_REQUEST' });

      const createdAdmin = await ctx.prisma.admin.create({ data: { email } });

      return createdAdmin;
    },
  })
  .mutation('demote', {
    input: z.object({ email: z.string() }),
    async resolve({ ctx, input: { email } }) {
      if (ctx.session?.user?.email !== process.env.ADMIN_EMAIL) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const foundUser = await ctx.prisma.user.findUnique({
        where: { email },
      });

      if (!foundUser) throw new TRPCError({ message: 'user not found', code: 'BAD_REQUEST' });

      return await ctx.prisma.admin.delete({ where: { email } });
    },
  })
  .mutation('delete', {
    input: z.object({ email: z.string() }),
    async resolve({ ctx, input: { email } }) {
      if (ctx.session?.user?.email !== process.env.ADMIN_EMAIL) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const foundUser = await ctx.prisma.user.findUnique({
        where: { email },
      });

      if (!foundUser) throw new TRPCError({ message: 'user not found', code: 'BAD_REQUEST' });

      const foundAdmin = await ctx.prisma.admin.findUnique({ where: { email } });

      if (foundAdmin) await ctx.prisma.admin.delete({ where: { email } });

      await ctx.prisma.invitation.delete({ where: { email } });

      return await ctx.prisma.user.delete({ where: { email } });
    },
  })
  .query('currentUser', {
    async resolve({ ctx }) {
      if (!ctx.session) throw new TRPCError({ message: 'user not found', code: 'BAD_REQUEST' });

      const data = await ctx.prisma.$transaction([
        ctx.prisma.user.findUnique({
          where: {
            id: ctx.session.user?.id,
          },
        }),
        ctx.prisma.resume.findFirst({
          where: {
            userId: ctx.session.user?.id,
          },
        }),
      ]);

      return data;
    },
  })
  .query('withResume', {
    input: z.object({ page: z.number(), size: z.number(), name: z.string() }),
    async resolve({ ctx, input }) {
      const data = await ctx.prisma.$transaction([
        ctx.prisma.user.findMany({
          skip: (input.page - 1) * input.size,
          take: input.size,
          where: {
            resume: {
              isNot: null,
            },
            name: {
              contains: input.name,
            },
          },
          include: {
            resume: true,
          },
        }),
        ctx.prisma.user.count({
          where: {
            resume: {
              isNot: null,
            },
          },
        }),
      ]);

      return data;
    },
  })
  .query('userResume', {
    input: z.object({ userId: z.string() }),
    async resolve({ ctx, input }) {
      const resume = await ctx.prisma.resume.findFirst({
        where: {
          userId: input.userId,
        },
      });

      return resume;
    },
  });
