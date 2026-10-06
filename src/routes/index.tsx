import { component$, useSignal } from '@builder.io/qwik';
import { Form, routeAction$, routeLoader$ } from '@builder.io/qwik-city';
import { calculateQuote } from '../quote';

export const useRequestData = routeLoader$(() => ({ renderedAt: new Date().toISOString() }));
export const useQuote = routeAction$((input, { fail }) => {
  const result = calculateQuote(input);
  return 'error' in result ? fail(400, result) : result;
});

export default component$(() => {
  const requestData = useRequestData();
  const count = useSignal(0);
  const action = useQuote();
  return <main>
    <header><span class="badge">Qwik · Cloudflare Workers</span><h1>Render on the server.<br /><em>Resume in the browser.</em></h1><p class="intro">Qwik serializes the page's state and event handlers so interactions can resume without re-running the app to hydrate it.</p></header>
    <div class="grid">
      <section><span class="step">01 / Qwik City loader</span><h2>Data before JavaScript.</h2><p>The route loader runs on the Worker. Refresh to see a new request timestamp.</p><time dateTime={requestData.value.renderedAt}>{requestData.value.renderedAt}</time><p class="muted">Cloudflare Workers · no-store</p></section>
      <section><span class="step">02 / Resumable event</span><h2>Start from serialized state.</h2><p>A signal and a lazy-loaded event handler power this browser-only counter.</p><button type="button" onClick$={() => count.value++}>Count: {count.value}</button></section>
      <section class="wide"><span class="step">03 / Qwik City action</span><h2>Submit to the Worker.</h2><p>The route action validates and calculates on the server. Qwik's Form progressively enhances the native POST.</p>
        <Form action={action}><label>Quantity<input name="quantity" type="number" min="1" max="100" step="1" value="3" required /></label><label>Unit price (cents)<input name="unit_price_cents" type="number" min="1" max="1000000" step="1" value="250" required /></label><button disabled={action.isRunning}>{action.isRunning ? 'Calculating…' : 'Calculate a quote'}</button></Form>
        <output id="result" aria-live="polite">{action.value ? 'error' in action.value ? action.value.error : `${action.value.total_cents} cents · ${action.value.currency}` : 'Your server-calculated quote will appear here.'}</output>
      </section>
    </div><footer>Qwik City loader + action · Workers Static Assets · <a href="/api/health">Health</a> · <a href="/api/quote?quantity=3&unit_price_cents=250">JSON API</a></footer>
  </main>;
});
