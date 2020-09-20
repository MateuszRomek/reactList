export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SET_MODAL_DATA = 'SET_MODAL_DATA';

interface uiModal {
	isOpen: false;
	message: {
		title: string;
		content: string;
	};
}

export interface UiInitialState {
	modal: uiModal;
}

export interface ToggleModal {
	type: typeof TOGGLE_MODAL;
}

export interface SetModalData {
	type: typeof SET_MODAL_DATA;
	title: string;
	content: string;
}

export interface UiReducer {
	ui: UiInitialState;
}

export type UiActionTypes = ToggleModal | SetModalData;
