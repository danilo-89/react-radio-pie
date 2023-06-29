import React from 'react';

// Types
import { IselectedChoicePointerProps } from '../types';

const selectedChoicePointer = ({
	className,
	angleRotation,
	checked,
}: IselectedChoicePointerProps) => {
	return (
		<div
			className={className}
			style={{
				transform: `translate(-50%, -50%) rotate(${angleRotation}deg)`,
			}}
		>
			<div className='radio-pie-mid-circle-background' />
			<div className='radio-pie-mid-circle-hole' />
		</div>
	);
};

export default selectedChoicePointer;
