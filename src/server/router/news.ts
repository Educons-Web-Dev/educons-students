import { createRouter } from './context';
import superjson from 'superjson';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import sgMail from '@sendgrid/mail';
import ImageKit from 'imagekit';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const imageKit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URL!,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const getUnsubscribeUrl = () => {
  if (process.env.VERCEL_URL) return 'https://educons-students.vercel.app';

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const newsRouter = createRouter()
  .transformer(superjson)
  .mutation('create', {
    input: z.object({
      title: z.string(),
      thumbnailImageUrl: z.string(),
      thumbnailImageId: z.string(),
      content: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session?.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const createdNews = await ctx.prisma.news.create({
        data: {
          ...input,
        },
      });

      const newsletterSubscriptions = await ctx.prisma.newsletter.findMany();

      const subscriptions = newsletterSubscriptions.map((sub) => ({ email: sub.email, token: sub.token }));

      subscriptions.forEach(async (sub) => {
        await sgMail.send({
          from: 'studentskapraksa@educons.edu.rs',
          to: sub.email,
          templateId: 'd-7b021347cca742a79c10104c9fbc9b43',
          dynamicTemplateData: {
            title: createdNews.title,
            imageUrl: createdNews.thumbnailImageUrl,
            unsubUrl: `${getUnsubscribeUrl()}/newsletter/unsubscribe?token=${sub.token}&email=${sub.email}`,
            newsUrl: `${getUnsubscribeUrl()}/news/${createdNews.id}`,
          },
        });
      });

      return createdNews;
    },
  })
  .query('getAll', {
    input: z.object({ page: z.number(), size: z.number(), title: z.string() }),
    async resolve({ input: { page, size, title }, ctx }) {
      const data = await ctx.prisma.$transaction([
        ctx.prisma.news.findMany({
          skip: (page - 1) * size,
          take: size,
          where: {
            title: {
              contains: title,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
        ctx.prisma.news.count(),
      ]);

      return data;
    },
  })
  .query('byId', {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx }) {
      const foundNews = await ctx.prisma.news.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!foundNews) throw new TRPCError({ message: 'news not found', code: 'BAD_REQUEST' });

      return foundNews;
    },
  })
  .mutation('updateById', {
    input: z.object({
      id: z.string(),
      data: z.object({
        title: z.string(),
        content: z.string(),
        thumbnailImageUrl: z.string(),
        thumbnailImageId: z.string(),
      }),
    }),
    async resolve({ input: { id, data }, ctx }) {
      if (!ctx.session?.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const foundNews = await ctx.prisma.news.findUnique({ where: { id } });

      if (!foundNews) {
        throw new TRPCError({ message: 'news not found', code: 'BAD_REQUEST' });
      }

      if (foundNews.thumbnailImageId !== data.thumbnailImageId) {
        await imageKit.deleteFile(foundNews.thumbnailImageId);
      }

      return await ctx.prisma.news.update({
        where: { id: id },
        data: { ...data },
      });
    },
  })
  .mutation('deleteById', {
    input: z.object({ id: z.string() }),
    async resolve({ input, ctx }) {
      if (!ctx.session?.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const foundNews = await ctx.prisma.news.findUnique({ where: { id: input.id } });

      if (!foundNews) throw new TRPCError({ message: 'news not found', code: 'BAD_REQUEST' });

      await imageKit.deleteFile(foundNews.thumbnailImageId);

      return await ctx.prisma.news.delete({ where: { id: input.id } });
    },
  });
