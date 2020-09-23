export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SET_MODAL_DATA = 'SET_MODAL_DATA';
export const TOGGLE_SIDE_NAVIGATION = 'TOGGLE_SIDE_NAVIGATION';
interface uiModal {
	isOpen: boolean;
	message: {
		title: string;
		content: string;
	};
}

interface userSideNavigation {
	isSmall: boolean;
}
interface AddNewListButton {
	isActive: boolean;
}

interface ToggleModal {
	type: typeof TOGGLE_MODAL;
}

interface SetModalData {
	type: typeof SET_MODAL_DATA;
	title: string;
	content: string;
}

interface ToggleUserSideNavigation {
	type: typeof TOGGLE_SIDE_NAVIGATION;
}

export interface UiInitialState {
	modal: uiModal;
	sideNavigation: userSideNavigation;
}

export type UiActionTypes =
	| ToggleModal
	| SetModalData
	| ToggleUserSideNavigation;
export interface UiReducer {
	ui: UiInitialState;
}
