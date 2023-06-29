import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		// outputDiffMaxSize: 100000000,
		globals: true,
		environment: 'jsdom',
		environmentMatchGlobs: [
			// all tests in tests/dom will run in jsdom
			['tests/dom/**', 'jsdom'],
			// all tests in tests/ with .edge.test.ts will run in edge-runtime
			['**/*.edge.test.ts', 'edge-runtime'],
			// ...
		],
	},
});
