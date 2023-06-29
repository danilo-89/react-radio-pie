import React from 'react';

import clsx from 'clsx';

// Types
import { IChoiceContentProps } from '../types';

const ChoiceContent = ({
	index,
	id,
	left,
	top,
	choicesCount,
	radioPieId,
	checked,
	choiceCircleIndicator,
	choiceContent,
}: IChoiceContentProps) => {
	return (
		<>
			<div
				className={clsx(
					'radio-pie-choice-content',
					checked === index && 'radio-pie-choice-active'
				)}
				style={{
					left,
					top,
					maxWidth: `${(100 / choicesCount) * 1.25}%`,
				}}
				id={`radioPie${radioPieId}Slice${id}`}
			>
				{choiceCircleIndicator ? (
					<span className='radio-pie-choice-radio' />
				) : null}
				{choiceContent}
			</div>
		</>
	);
};

export default ChoiceContent;
