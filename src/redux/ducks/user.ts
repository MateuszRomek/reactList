import { Dispatch } from 'react';
import {
	IinitialState,
	UserActionTypes,
	SET_USER_DATA,
	GET_USER_START,
	GET_USER_FINISH,
	GET_USER_FAILED,
} from '../types/userTypes';

const initialState: IinitialState = {
	userId: '',
	name: '',
	email: '',
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
				email: action.email,
			};

		default:
			return {
				...state,
			};
	}
};
//Actions
export const setUserData = (
	userId: string,
	name: string,
	email: string
): UserActionTypes => ({
	type: SET_USER_DATA,
	userId,
	name,
	email,
});

type getUserDataStep = 'start' | 'finish' | 'fail';
const getUserData = (step: getUserDataStep): UserActionTypes => {
	switch (step) {
		case 'start':
			return {
				type: GET_USER_START,
			};
		case 'finish':
			return {
				type: GET_USER_FINISH,
			};

		case 'fail': {
			return {
				type: GET_USER_FAILED,
			};
		}

		default: {
			return {
				type: GET_USER_FAILED,
			};
		}
	}
};

export const getUserOnRefresh = () => {
	return async (dispatch: Dispatch<UserActionTypes>) => {
		const t = localStorage.getItem('token');
		dispatch(getUserData('start'));
		try {
			const response = await fetch('http://localhost:8080/userInf', {
				method: 'GET',
				headers: {
					Authorization: `Bearer  ${t}`,
					'Content-Type': 'application/json',
				},
			});
			const data: {
				userId: string;
				name: string;
				email: string;
				status?: number;
				message: string;
			} = await response.json();
			if (data.status !== 200) {
				throw data;
			}
			const { email, name, userId } = data;
			dispatch(setUserData(userId, name, email));
			dispatch(getUserData('finish'));
		} catch (err) {
			dispatch(getUserData('fail'));
		}
	};
};
