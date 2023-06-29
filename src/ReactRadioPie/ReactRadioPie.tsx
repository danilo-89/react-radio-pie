import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';

// Utils
import { calculateSliceCenter, parseChoicesData } from './utils';

// Components
import ChoiceElement from './components/ChoiceElement';
import SelectedChoicePointer from './components/SelectedChoicePointer';

// Styles
import ChoiceContent from './components/ChoiceContent';

// Types
import { IReactRadioPieProps } from './types';
import { useReactRadioPie } from './context/ReactRadioPieContext';

/**
 * Customizable radio button elements in a circular layout suitable for pie chart visualization in React
 */
const ReactRadioPie = ({
	id,
	required = false,
	deselect = false,
	choiceCircleIndicator = true,
	selectedChoicePointer = false,
	background = false,
	checked: checkedIndex = undefined,
	choices,
	trackParity = true,
	sliceSize = 22,
	type = 'slices',
}: IReactRadioPieProps) => {
	const { checked, setChecked, setDeselect } = useReactRadioPie();
	const slicesRef = useRef<SVGCircleElement[]>([]);
	const choicesCount = choices.length;
	const offset = 25 + 100 / (choicesCount * 2);

	// get top label position for first slice
	const centerBasePosition = ((sliceSize / (31.83 + sliceSize)) * 100) / 2;

	// get middle circle rotation
	const angleRotation = (360 / choicesCount) * (checked || 0);

	useEffect(() => {
		setChecked(checkedIndex);
	}, [checkedIndex, setChecked]);

	useEffect(() => {
		setDeselect(deselect);
	}, [deselect, setDeselect]);

	const middClassName = clsx(
		'radio-pie-mid-circle',
		checked === undefined && 'radio-pie-choice-undefined'
	);

	const slicesData = useMemo(
		() => parseChoicesData(choices, choicesCount, offset),
		[choices, choicesCount, offset]
	);

	const centerPositions = useMemo(
		() =>
			Array.from(Array(choicesCount).keys()).map((item) =>
				calculateSliceCenter(item, centerBasePosition, choicesCount)
			),
		[centerBasePosition, choicesCount]
	);

	const changeFocus = useCallback(
		(direction: string) => {
			const activeIndex = slicesRef.current.findIndex(
				(a) => document.activeElement === a
			);
			const nextIndex = choicesCount === activeIndex + 1 ? 0 : activeIndex + 1;
			const prevIndex = activeIndex === 0 ? choicesCount - 1 : activeIndex - 1;
			slicesRef.current[direction === 'down' ? nextIndex : prevIndex]?.focus();
			setChecked(direction === 'down' ? nextIndex : prevIndex);
		},
		[choicesCount, setChecked]
	);

	return (
		<div
			role='radiogroup'
			aria-required={required}
			className='radio-pie'
			id={id}
		>
			<div className='radio-pie-inside'>
				{background ? <div className='radio-pie-background' /> : null}
				{centerPositions.map((item, index) => (
					<ChoiceContent
						key={choices[index].id}
						id={choices[index].id}
						index={index}
						choicesCount={choicesCount}
						left={`${item.x.toFixed(4)}%`}
						top={`${item.y.toFixed(4)}%`}
						choiceContent={choices[index].content}
						radioPieId={id}
						choiceCircleIndicator={choiceCircleIndicator}
						checked={checked}
					/>
				))}
				{selectedChoicePointer && (
					<SelectedChoicePointer
						className={middClassName}
						angleRotation={angleRotation}
						checked={checked}
					/>
				)}
				<svg
					className='radio-pie-slices'
					width='100%'
					viewBox={`0 0 ${31.83 + sliceSize} ${31.83 + sliceSize}`}
				>
					{slicesData.map((item, index) => (
						<ChoiceElement
							ref={slicesRef}
							index={index}
							radioPieId={id}
							type={type}
							deselect={deselect}
							parity={
								trackParity
									? index % 2 === 0
										? 'radio-pie-choice-element-odd'
										: 'radio-pie-choice-element-even'
									: false
							}
							cx={centerPositions[index].x.toFixed(4)}
							cy={centerPositions[index].y.toFixed(4)}
							key={item.id}
							id={item.id}
							strokeDasharray={item.strokeDasharray}
							strokeDashoffset={item.strokeDashoffset}
							strokeWidth={sliceSize}
							isChecked={checked === index}
							setChecked={setChecked}
							choicesCount={choicesCount}
							changeFocus={changeFocus}
						/>
					))}
				</svg>
			</div>
		</div>
	);
};

export default ReactRadioPie;
