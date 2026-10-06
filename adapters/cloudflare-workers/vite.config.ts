import { mergeConfig } from 'vite';
import { cloudflarePagesAdapter } from '@builder.io/qwik-city/adapters/cloudflare-pages/vite';
import base from '../../vite.config';

// Qwik 1's official Worker middleware shares the cloudflare-pages adapter name.
// Generate the adapter's routing files without prerendering any page.
export default mergeConfig(base, {
  build: {
    ssr: true,
    outDir: 'server',
    rollupOptions: { input: ['src/entry.ssr.tsx', 'src/entry.cloudflare-pages.tsx', '@qwik-city-plan'] },
  },
  plugins: [cloudflarePagesAdapter({ ssg: { include: [], maxWorkers: 1 }, functionRoutes: false })],
});
