// src/server/router/index.ts
import superjson from 'superjson';
import { createRouter } from './context';
import { contactRouter } from './contact';
import { newsRouter } from './news';
import { newsletterRouter } from './newsletter';
import { resumeRouter } from './resume';
import { userRouter } from './user';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('news.', newsRouter)
  .merge('user.', userRouter)
  .merge('resume.', resumeRouter)
  .merge('newsletter.', newsletterRouter)
  .merge('contact.', contactRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
