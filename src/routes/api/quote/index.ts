import type { RequestHandler } from '@builder.io/qwik-city';
import { calculateQuote } from '../../../quote';

export const onRequest: RequestHandler = ({ request, headers, json }) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    headers.set('Allow', 'GET, HEAD');
    json(405, { error: 'Method not allowed.' });
  }
};
export const onGet: RequestHandler = ({ url, json }) => {
  const result = calculateQuote(url.searchParams);
  json('error' in result ? 400 : 200, result);
};
export const onHead: RequestHandler = onGet;
