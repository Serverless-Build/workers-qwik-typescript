import { render, type RenderOptions } from '@builder.io/qwik';
import Root from './root';

export default (options: RenderOptions) => render(document, <Root />, options);
