import { createQwikCity } from '@builder.io/qwik-city/middleware/cloudflare-pages';
import qwikCityPlan from '@qwik-city-plan';
import render from './entry.ssr';

// This fetch handler is used by the generated module Worker, not a Pages project.
export const fetch = createQwikCity({ render, qwikCityPlan });
