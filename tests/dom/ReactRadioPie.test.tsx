import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReactRadioPie from '../../src/ReactRadioPie';
import { IReactRadioPieProps } from '../../src/ReactRadioPie/types';

const mockedChoices = [
	{ id: '1', content: 'Choice 1' },
	{ id: '2', content: 'Choice 2' },
	{ id: '3', content: 'Choice 3' },
	{ id: '4', content: 'Choice 4' },
];

const defaultProps: IReactRadioPieProps = {
	id: 'test',
	required: false,
	deselect: false,
	choiceCircleIndicator: true,
	selectedChoicePointer: false,
	background: false,
	checked: undefined,
	choices: mockedChoices,
	trackParity: true,
	sliceSize: 22,
	type: 'slices',
};

describe('ReactRadioPie component', () => {
	it('renders without crashing', () => {
		const { container } = render(<ReactRadioPie {...defaultProps} />);
		expect(container).toBeInTheDocument();
	});
});
