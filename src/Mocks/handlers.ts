// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get(`/ping`, (_req, res, ctx) => {
    const message = 'Welcome buddy!';
    return res(ctx.delay(100), ctx.status(200), ctx.json(message));
  }),
];
