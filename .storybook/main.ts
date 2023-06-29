module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
		'storybook_vitest_addon',
		// 'storybook-dark-mode',
		'@storybook/addon-mdx-gfm',
	],
	core: {
		disableTelemetry: true,
	},
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	features: {
		storyStoreV7: true,
	},
	docs: {
		autodocs: false,
	},
};
