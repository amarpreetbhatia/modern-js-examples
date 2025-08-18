import { useHonoContext } from '@modern-js/server-runtime';
import { streamSSE } from 'hono/streaming';

export default async () => {
  const c = useHonoContext();

  let id = 0;
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

export const post = async () => ({
  message: 'Hello Modern.js',
});
