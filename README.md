# Qwik on Workers

A stable Qwik 1.20 app with request-time SSR, a Qwik City route loader/action, and resumable browser interaction. It deploys as a module Worker with Workers Static Assets.

## Run and deploy

Use Node.js 22.22 or later. `.node-version` pins the tested Node 24.21.0 toolchain. Qwik 1 requires Vite below 8; this example pins Vite 7.3.6.

```sh
npm ci
npm run dev
```

```sh
npm run check
npm run bundle
npm run start
```

`check` generates Workers types, checks TypeScript, builds the browser and server, and performs a Wrangler dry run. `bundle` writes a self-contained reviewed Worker to `server/worker-bundle`. `start` previews the built app in Workers. Log in with Wrangler, select your account, and use `npm run deploy`.

Qwik 1's official Workers integration uses the `cloudflare-pages` adapter/middleware package name. This project uses its generated `dist/_worker.js` with Wrangler, not a Pages deployment. The entrypoint imports the `server/` build, so upload the dry-run bundle when provisioning prebuilt code. The stable middleware expects `ASSETS`; the binding name is preserved. The adapter generates routing files with an empty prerender allowlist: no page is prerendered, so the timestamp remains request-time data. `.assetsignore` keeps Worker code out of public static assets.

## Try it

- Open `/`. `routeLoader$` supplies a timestamp in the server-rendered HTML. Refresh to reset the counter.
- Click the counter. Qwik resumes its serialized signal and lazy-loads the event handler.
- Submit the Qwik City `Form`. `routeAction$` validates and calculates on the Worker; invalid input displays the server error.
- `GET /api/health` checks liveness.
- `GET /api/quote?quantity=3&unit_price_cents=250` returns 750 cents in USD. Quantity must be one integer 1–100, unit price one integer 1–1000000. Missing, duplicate, decimal, and out-of-range inputs return 400.
- `/robots.txt` and built JS/CSS are served by Workers Static Assets.

This stateless example uses `no-store`, permits HTTPS embedding and loopback development, and needs no database or application Durable Object.

See [Qwik on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/qwik/), [the official Worker integration](https://qwik.dev/docs/deployments/cloudflare-workers/), [loaders](https://qwik.dev/docs/route-loader/), and [actions](https://qwik.dev/docs/action/).

## Pattern and live demo

- [Pattern page](https://serverless.build/patterns/qwik-workers)
- [Live deployment](https://workers-qwik-typescript.dwarven.workers.dev)
