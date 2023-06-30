import { Dispatch, SetStateAction } from 'react';

type checked = number | undefined;
type radioPieId = string;

export interface IChoices {
	id: string | number;
	content: string | number | JSX.Element | JSX.Element[] | React.ReactNode;
}

export interface IChildren {
	children: JSX.Element | JSX.Element[] | React.ReactNode;
}

export type tReducer =
	| number
	| undefined
	| ((arg1: number | undefined) => number | undefined);

export interface IReactRadioPieContext {
	checked: undefined | number;
	deselect: boolean;
	setDeselect: Dispatch<SetStateAction<boolean>>;
	setChecked: Dispatch<tReducer>;
}

export interface ISlicesData {
	value: string | number | JSX.Element | JSX.Element[] | React.ReactNode;
	prevSum: number;
	id: number | string;
	strokeDashoffset: number;
	strokeDasharray: string;
}

export interface IReactRadioPieProps {
	/**
	 * the ID for the radio button group
	 */
	id: radioPieId;
	/**
	 * whether the radio button group is required or not
	 */
	required?: boolean;
	/**
	 * whether the selected radio button can be deselected or not
	 */
	deselect?: boolean;
	/**
	 * whether to show the small circle in each slice indicating the selected choice
	 */
	choiceCircleIndicator?: boolean;
	/**
	 * whether to show the middle circle with the pointer indicating the selected choice
	 */
	selectedChoicePointer?: boolean;
	/**
	 * whether to show a background for the radio button group
	 */
	background?: boolean;
	/**
	 * the index of the selected radio button
	 */
	checked?: checked;
	/**
	 * an array of objects with the choice content and ID
	 */
	choices: IChoices[];
	/**
	 * whether to track the parity of all choices
	 */
	trackParity?: boolean;
	/**
	 * the size of each slice (max: 31.83)
	 */
	sliceSize?: number;
	/**
	 * the type of radio button group
	 */
	type?: 'slices' | 'circles';
}

export interface IChoiceElementProps {
	radioPieId: radioPieId;
	index: number;
	deselect: boolean;
	parity: string | false;
	cx: string;
	cy: string;
	id: string | number;
	strokeDashoffset: number;
	strokeDasharray: string;
	strokeWidth: number;
	isChecked: boolean;
	setChecked: Dispatch<tReducer>;
	changeFocus: (arg1: string) => void;
	choicesCount: number;
	type: 'slices' | 'circles';
}

export interface IChoiceContentProps {
	index: number;
	id: string | number;
	left: string;
	top: string;
	choicesCount: number;
	radioPieId: radioPieId;
	checked: checked;
	choiceCircleIndicator: boolean;
	choiceContent:
		| string
		| number
		| JSX.Element
		| JSX.Element[]
		| React.ReactNode;
}

export interface IselectedChoicePointerProps {
	className: string;
	angleRotation: number;
	checked: checked;
}
