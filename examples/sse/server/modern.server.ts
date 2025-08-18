import {
  type MiddlewareHandler,
  defineServerConfig,
} from '@modern-js/server-runtime';
import { streamSSE } from 'hono/streaming';

const requireAuthForApi: MiddlewareHandler = async (c, next) => {
  let id = 0;
  console.log('SSE Event');
  return streamSSE(c, async stream => {
    while (true) {
      const message = `It is ${new Date().toISOString()}`;
      await stream.writeSSE({
        data: message,
        event: 'time-update',
        id: String(id++),
      });
      await stream.sleep(1000);
    }
  });
};

export default defineServerConfig({
  middlewares: [
    {
      name: 'require-auth-for-api',
      handler: requireAuthForApi,
      path: '/sse',
    },
  ],
});
