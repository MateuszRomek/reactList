import {
	IinitialState,
	UserActionTypes,
	SET_USER_TOKEN,
	SET_USER_DATA,
} from './userTypes';

const initialState: IinitialState = {
	userId: '',
	isToken: false,
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
