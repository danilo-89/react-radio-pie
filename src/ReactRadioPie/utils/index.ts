// Types
import { IChoices, tReducer, ISlicesData } from '../types';

/**
 * Calculates the center coordinates of a slice in a circular layout.
 *
 * @param {number} k - Index of the slice.
 * @param {number} centerPos - Position of the center.
 * @param {number} choicesCount - Total number of choices/slices.
 * @returns {{x: number, y: number}} - Object containing the x and y coordinates of the center.
 */
export const calculateSliceCenter = (
	k: number,
	centerPos: number,
	choicesCount: number
) => {
	const top0 = centerPos / 100;
	const left0 = 0.5;
	const V0 = { x: left0 - 0.5, y: top0 - 0.5 };
	const Ra = (2 * Math.PI) / choicesCount;

	return {
		x: (0.5 + (V0.x * Math.cos(k * Ra) - V0.y * Math.sin(k * Ra))) * 100,
		y: (0.5 + (V0.x * Math.sin(k * Ra) - V0.y * -Math.cos(k * Ra))) * 100,
	};
};

/**
 * Parses choices data and calculates the necessary properties for each choice in a circular layout.
 *
 * @param {IChoices[]} choices - Array of choice objects.
 * @param {number} choicesCount - Total number of choices.
 * @param {number} offset - Offset value for stroke dash offset.
 * @returns {ISlicesData[]} - Array of parsed slices data.
 */
export const parseChoicesData = (
	choices: IChoices[],
	choicesCount: number,
	offset: number
) =>
	choices.reduce((accumulator, currentValue, index) => {
		const per = (1 / choicesCount) * 100;
		const newSum: number =
			index === 0 ? per : accumulator[index - 1].prevSum + per;
		const strokeDasharray = `${per} ${100 - per}`;
		const strokeDashoffset: number =
			index === 0 ? offset : 100 - accumulator[index - 1].prevSum + offset;

		return [
			...accumulator,
			{
				value: currentValue.content,
				prevSum: newSum,
				index: index,
				id: currentValue.id,
				strokeDashoffset,
				strokeDasharray,
			},
		];
	}, [] as ISlicesData[]);

/**
 * Reducer function used for updating data based on the given inputs.
 *
 * @param {number | undefined} currData - Current data value.
 * @param {tReducer} newData - New data value or a function to update the current data.
 * @param {boolean} deselect - Flag indicating whether to deselect the current data.
 * @returns {number | undefined} - Updated data value.
 */
export const reducer = (
	currData: number | undefined,
	newData: tReducer,
	deselect: boolean
) => {
	if (typeof newData === 'function') {
		return newData(currData);
	}
	if (currData === newData && !deselect) return currData;
	return newData === currData ? undefined : newData;
};

/**
 * Object representing circle radius for different counts.
 */
export const circleRadius = {
	2: 11,
	3: 11,
	4: 10,
};
