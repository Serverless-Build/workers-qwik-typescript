import { renderToStream, type RenderToStreamOptions } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

export default (options: RenderToStreamOptions) => renderToStream(<Root />, {
  ...options,
  manifest,
  containerAttributes: { lang: 'en', ...options.containerAttributes },
});
