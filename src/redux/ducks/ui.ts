import {
	UiInitialState,
	TOGGLE_MODAL,
	UiActionTypes,
	SET_MODAL_DATA,
	TOGGLE_SIDE_NAVIGATION,
} from '../types/uiTypes';

const initialState: UiInitialState = {
	modal: {
		isOpen: false,
		message: {
			title: '',
			content: '',
		},
	},
	sideNavigation: {
		isSmall: false,
	},
};

export default (state = initialState, action: UiActionTypes) => {
	switch (action.type) {
		case TOGGLE_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					isOpen: !state.modal.isOpen,
				},
			};
		case SET_MODAL_DATA: {
			return {
				...state,
				modal: {
					...state.modal,
					message: {
						title: action.title,
						content: action.content,
					},
				},
			};
		}

		case TOGGLE_SIDE_NAVIGATION: {
			return {
				...state,
				sideNavigation: {
					...state.sideNavigation,
					isSmall: !state.sideNavigation.isSmall,
				},
			};
		}
		default:
			return {
				...state,
			};
	}
};

export const toggleModal = (): UiActionTypes => ({
	type: TOGGLE_MODAL,
});

export const setModalData = (
	title: string,
	content: string
): UiActionTypes => ({
	type: SET_MODAL_DATA,
	title,
	content,
});

export const toggleSideNavigation = (): UiActionTypes => ({
	type: TOGGLE_SIDE_NAVIGATION,
});
