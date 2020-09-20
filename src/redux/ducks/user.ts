import {
	IinitialState,
	UserActionTypes,
	SET_USER_DATA,
} from '../types/userTypes';

const initialState: IinitialState = {
	userId: '',
	name: '',
};

//Reducer
export default (
	state = initialState,
	action: UserActionTypes
): IinitialState => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				userId: action.userId,
				name: action.name,
			};

		default:
			return {
				...state,
			};
	}
};
//Actions
export const setUserData = (userId: string, name: string): UserActionTypes => ({
	type: SET_USER_DATA,
	userId,
	name,
});
