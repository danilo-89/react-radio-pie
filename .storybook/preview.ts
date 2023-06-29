// import { themes } from '@storybook/theming';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
		expanded: true,
	},
	// darkMode: {
	// 	// Override the default dark theme
	// 	dark: { ...themes.dark, appBg: 'black' },
	// },
};
