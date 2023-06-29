import React from 'react';
import { StoryContext, Meta, StoryFn } from '@storybook/react';

import ReactRadioPie, {
	ReactRadioPieProvider,
	useReactRadioPie,
	ReactRadioPieCSS,
} from '../ReactRadioPie';

import ChoiceContent from '../ReactRadioPie/components/ChoiceContent';

// Styles
import './radio-pie.css';
import './component-controls.css';

const choices = [
	{ id: 'f21a4d9c-b452-4a5c-8c4f-4c4e43a580f3', content: 'Never' },
	{
		id: '37e1dfe9-9c88-4d29-935a-2b0c58e15e1f',
		content: 'Rarely (once a month or less)',
	},
	{
		id: '9dcbf383-9f32-4d1c-8a57-ec569f8cb725',
		content: 'Occasionally (a few times a month)',
	},
	{
		id: 'a550db7f-0e0d-4589-9b0d-7d1b95f7396c',
		content: 'Sometimes (once a week or so)',
	},
	{
		id: '3d6bba3a-9609-4f56-9d80-af616d4481ab',
		content: 'Often (a few times a week)',
	},
	{
		id: '2b2d3b03-44e6-4879-9aa9-cf234b1dab96',
		content: 'Very often (almost every day)',
	},
];

const pieExampleChoices = [
	{ id: 'f21a4d9c-b452-4a5c-8c4f-4c4e43a580f3', content: '1st slice' },
	{
		id: '37e1dfe9-9c88-4d29-935a-2b0c58e15e1f',
		content: '2nd slice',
	},
	{
		id: '9dcbf383-9f32-4d1c-8a57-ec569f8cb725',
		content: '3rd slice',
	},
	{
		id: 'a550db7f-0e0d-4589-9b0d-7d1b95f7396c',
		content: '4th slice',
	},
	{
		id: '3d6bba3a-9609-4f56-9d80-af616d4481ab',
		content: '5th slice',
	},
	{
		id: '2b2d3b03-44e6-4879-9aa9-cf234b1dab96',
		content: '6th slice',
	},
];

interface IComponentControls {
	choicesCount: number;
}

const ComponentControls = ({ choicesCount }: IComponentControls) => {
	const { checked, setChecked, deselect, setDeselect } = useReactRadioPie();
	const nextIndex = (activeIndex: number | undefined) =>
		choicesCount === (activeIndex || 0) + 1 ? 0 : (activeIndex || 0) + 1;
	const prevIndex = (activeIndex: number | undefined) =>
		activeIndex === 0 ? choicesCount - 1 : (activeIndex || 1) - 1;

	return (
		<div id='componentControls'>
			<div>choices count: {choicesCount}</div>
			<div>selected choice (index): {checked}</div>
			<button
				onClick={() =>
					setChecked((curr: number | undefined) => prevIndex(curr))
				}
			>
				&lt;
			</button>
			<button
				onClick={() =>
					setChecked((curr: number | undefined) => nextIndex(curr))
				}
			>
				&gt;
			</button>
		</div>
	);
};

const withLayout = (Story: () => JSX.Element, context: StoryContext) => {
	console.log(context);
	const choicesCount = context.allArgs.choices.length;

	return (
		<ReactRadioPieProvider>
			<ComponentControls choicesCount={choicesCount} />
			{Story()}
		</ReactRadioPieProvider>
	);
};

export default {
	title: 'Examples',
	component: ReactRadioPie,
	subcomponents: { ChoiceContent },
	decorators: [withLayout],
	parameters: {
		vitest: {
			testFile: 'ReactRadioPie.test.tsx',
			// testResults: vitestResults,
		},
	},
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	// argTypes: {
	// 	backgroundColor: { control: 'color' },
	// },
} as Meta<typeof ReactRadioPie>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ReactRadioPie> = (args) => {
	return (
		<>
			<ReactRadioPie {...args} />
		</>
	);
};

export const Default = Template.bind({});
Default.args = {
	...Default.args,
	id: '1',
	choices,
	checked: 3,
	// deselect: true,
};

export const selectedChoicePointer = Template.bind({});
selectedChoicePointer.storyName = 'Default (selectedChoicePointer)';
selectedChoicePointer.args = {
	...selectedChoicePointer.args,
	id: '1',
	choices,
	checked: 3,
	selectedChoicePointer: true,
};

export const PieExample = Template.bind({});
PieExample.args = {
	...PieExample.args,
	id: 'pieExample',
	choices: pieExampleChoices,
	checked: 1,
	background: true,
	trackParity: false,
	deselect: true,
	sliceSize: 31.83,
};

export const Circles = Template.bind({});
Circles.args = {
	...Circles.args,
	id: 'circlesExample',
	choices,
	checked: 1,
	type: 'circles',
};
