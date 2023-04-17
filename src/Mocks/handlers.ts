// src/mocks/handlers.js
import { User } from '@/Entities/UserEntities';
import { rest } from 'msw';

const users: User[] = [
  {
    id: 1,
    email: 'adnane@gmail.com',
    password: '123456789',
  },
  {
    id: 2,
    email: 'wiam_chliah',
    password: '369258147',
  },
];

export const handlers = [
  rest.post(`${import.meta.env.VITE_APP_URL}/api/auth/signin`, async (req, res, ctx) => {
    const body = await req.json();
    const user = users.find((x) => x.email === body.username && x.password === body.password);
    if (!user)
      return await res(
        ctx.delay(100),
        ctx.status(404),
        ctx.json({
          message: `Username or password is incorrect.`,
        }),
      );

    return await res(ctx.delay(100), ctx.status(200), ctx.json(user));
  }),

  rest.post(`${import.meta.env.VITE_APP_URL}/api/auth/signup`, async (req, res, ctx) => {
    const body = await req.json();
    if (users.findIndex((x) => x.email === body.username) !== -1)
      return await res(
        ctx.delay(100),
        ctx.status(403),
        ctx.json({
          message: `Username already exists.`,
        }),
      );

    const newId = users.reverse()[0].id + 1;
    const newUser: User = {
      id: newId,
      email: body.username,
      password: body.password,
    };

    users.push(newUser);
    return await res(ctx.delay(100), ctx.status(200), ctx.json(newUser));
  }),
];
