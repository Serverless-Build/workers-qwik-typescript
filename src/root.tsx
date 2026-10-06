import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet } from '@builder.io/qwik-city';
import './style.css';

export default component$(() => <QwikCityProvider>
  <head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>Qwik on Workers</title></head>
  <body><RouterOutlet /></body>
</QwikCityProvider>);
