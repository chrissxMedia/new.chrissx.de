import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { remarkAlert } from 'remark-github-blockquote-alert';
import pagefind from './src/pagefind';

export default defineConfig({
    integrations: [pagefind],
    markdown: {
        processor: unified({ remarkPlugins: [remarkAlert] }),
    },
});
