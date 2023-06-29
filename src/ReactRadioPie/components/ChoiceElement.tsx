import React from 'react';

import {
	ForwardedRef,
	forwardRef,
	MutableRefObject,
	KeyboardEvent,
} from 'react';
import clsx from 'clsx';

// Utils
import { circleRadius } from '../utils';

// Types
import { IChoiceElementProps } from '../types';

const ChoiceElement = forwardRef(function ChoiceElement(
	{
		radioPieId,
		index,
		type,
		deselect,
		parity,
		cx,
		cy,
		id,
		strokeDasharray,
		strokeDashoffset,
		strokeWidth,
		isChecked,
		setChecked,
		choicesCount,
		changeFocus,
	}: IChoiceElementProps,
	ref: ForwardedRef<SVGCircleElement[]>
) {
	const className = clsx(
		type === 'slices' && 'radio-pie-choice-slice',
		type === 'circles' && 'radio-pie-choice-circle',
		isChecked && 'radio-pie-choice-active',
		`radio-pie-choice-${index}`,
		parity
	);

	const handleOnKeyDown = (e: KeyboardEvent<SVGCircleElement>) => {
		if (e.code === 'Enter' || e.code === 'Space') {
			setChecked(index);
		}
		if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
			changeFocus('down');
		}
		if (e.code === 'ArrowUp' || e.code === 'ArrowLeft') {
			changeFocus('up');
		}
	};

	return (
		<>
			{type === 'slices' ? (
				<circle
					ref={(element: SVGCircleElement) => {
						(ref as MutableRefObject<SVGCircleElement[]>).current[index] =
							element;
					}}
					className={className}
					cx={'50%'}
					cy={'50%'}
					r={15.915} // 15.915 is radius required to for circumference to be 100
					fill='transparent'
					pointerEvents='stroke'
					strokeWidth={`${strokeWidth}`}
					strokeDasharray={strokeDasharray}
					strokeDashoffset={strokeDashoffset}
					onClick={() => {
						setChecked(index);
					}}
					onKeyDown={(e) => {
						handleOnKeyDown(e);
					}}
					role='radio'
					aria-checked={isChecked ? 'true' : 'false'}
					aria-labelledby={`radioPie${radioPieId}Slice${id}`}
					tabIndex={0}
					cursor={'pointer'}
				/>
			) : (
				<circle
					ref={(element: SVGCircleElement) => {
						(ref as MutableRefObject<SVGCircleElement[]>).current[index] =
							element;
					}}
					className={className}
					r={`${
						choicesCount < 5
							? circleRadius[choicesCount as keyof typeof circleRadius]
							: 15.915 * (2.79 / choicesCount)
					}`}
					cx={`${cx}%`}
					cy={`${cy}%`}
					onClick={() => {
						setChecked(index);
					}}
					onKeyDown={(e) => {
						handleOnKeyDown(e);
					}}
					role='radio'
					aria-checked={isChecked ? 'true' : 'false'}
					aria-labelledby={`radioPie${radioPieId}Slice${id}`}
					tabIndex={0}
					cursor={'pointer'}
				/>
			)}
			<circle
				className='radio-pie-choice-focus-ring'
				r={`${
					choicesCount < 5
						? circleRadius[choicesCount as keyof typeof circleRadius]
						: 15.915 * (2.79 / choicesCount)
				}`}
				cx={`${cx}%`}
				cy={`${cy}%`}
				fontSize='1'
				pointerEvents='none'
			/>
		</>
	);
});

export default ChoiceElement;
