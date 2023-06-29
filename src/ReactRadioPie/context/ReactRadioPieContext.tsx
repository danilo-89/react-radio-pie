import React, {
	useState,
	createContext,
	useContext,
	useMemo,
	useReducer,
} from 'react';

// Types
import { IChildren, IReactRadioPieContext, tReducer } from '../types';

// Utils
import { reducer } from '../utils';

const ReactRadioPieContext = createContext<IReactRadioPieContext>({
	checked: undefined,
	setChecked: (arg1: tReducer) => null,
	deselect: false,
	setDeselect: () => null,
});

export function ReactRadioPieProvider({ children }: IChildren) {
	const [deselect, setDeselect] = useState<boolean>(false);
	const extendedReducer = (arg1: number | undefined, arg2: tReducer) =>
		reducer(arg1, arg2, deselect);
	const [checked, setChecked] = useReducer(extendedReducer, undefined);

	const contextValue = useMemo(
		() => ({
			checked,
			deselect,
			setDeselect,
			setChecked,
		}),
		[checked, deselect]
	);

	return (
		<ReactRadioPieContext.Provider value={contextValue}>
			{children}
		</ReactRadioPieContext.Provider>
	);
}

export const useReactRadioPie = () => {
	const context = useContext(ReactRadioPieContext);

	// error handling (if component is not inside context provider)
	if (context === undefined) {
		throw new Error(
			'useReactRadioPie must be used inside a ReactRadioPieProvider'
		);
	}

	return context;
};
