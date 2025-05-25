import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		alias: {
			$components: 'src/components',
			$stores: 'src/stores',
			$types: 'src/types'
		},
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/svelte-breakout-game' : ''
		}
	}
};

export default config;