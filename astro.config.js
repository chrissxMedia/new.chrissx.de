import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { remarkAlert } from 'remark-github-blockquote-alert';
import buildCommit from 'cmdesigns/build-commit';
import pagefind from './src/pagefind';

export default defineConfig({
    site: 'https://chrissx.de',
    redirects: { '/experiments/repos': '/repos' },
    integrations: [pagefind, buildCommit('github:chrissxMedia/new.chrissx.de')],
    markdown: {
        processor: unified({ remarkPlugins: [remarkAlert] }),
    },
});
