// Types
import { IChoices, tReducer, ISlicesData } from '../types';

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

export const reducer = (
	currData: number | undefined,
	newData: tReducer,
	deselect: boolean
) => {
	console.log(currData, newData, deselect);
	if (typeof newData === 'function') {
		return newData(currData);
	}
	if (currData === newData && !deselect) return currData;
	return newData === currData ? undefined : newData;
};

export const circleRadius = {
	2: 11,
	3: 11,
	4: 10,
};
