import { defineConfig } from 'astro/config';
import pagefind from './src/pagefind';

export default defineConfig({
    integrations: [pagefind],
});
