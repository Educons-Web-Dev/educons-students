import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const resumeRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({ content: z.string() }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;

      const foundResume = await ctx.prisma.resume.findFirst({
        where: {
          userId,
        },
      });

      if (foundResume) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Resume already created' });

      const createdResume = await ctx.prisma.resume.create({
        data: {
          content: input.content,
          userId,
        },
      });

      return createdResume;
    },
  })
  .mutation('update', {
    input: z.object({ content: z.string(), id: z.string() }),
    async resolve({ ctx, input }) {
      const foundResume = await ctx.prisma.resume.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!foundResume) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Resume not found' });

      if (ctx.session.user.id !== foundResume.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const updatedResume = await ctx.prisma.resume.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
        },
      });

      return updatedResume;
    },
  })
  .mutation('delete', {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      const foundResume = await ctx.prisma.resume.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!foundResume) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Resume not found' });

      if (ctx.session.user.id !== foundResume.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

      const deletedResume = await ctx.prisma.resume.delete({
        where: {
          id: input.id,
        },
      });

      return deletedResume;
    },
  });
