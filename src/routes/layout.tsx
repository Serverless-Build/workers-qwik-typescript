import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';

export const onRequest: RequestHandler = ({ headers }) => {
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Content-Security-Policy', 'frame-ancestors https: http://localhost:* http://127.0.0.1:*');
};

export default component$(() => <Slot />);
