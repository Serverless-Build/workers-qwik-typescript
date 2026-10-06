import type { RequestHandler } from '@builder.io/qwik-city';

export const onRequest: RequestHandler = ({ request, headers, json }) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    headers.set('Allow', 'GET, HEAD');
    json(405, { error: 'Method not allowed.' });
  }
};
export const onGet: RequestHandler = ({ json }) => {
  json(200, { ok: true, framework: 'Qwik', marker: 'SERVERLESS_BUILD_QWIK_TYPESCRIPT_V1' });
};
export const onHead: RequestHandler = onGet;
