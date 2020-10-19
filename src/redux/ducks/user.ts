import { Dispatch } from 'react';
import {
	IinitialState,
	UserActionTypes,
	SET_USER_DATA,
	GET_USER_START,
	GET_USER_FINISH,
	GET_USER_FAILED,
	SIGN_OUT_USER,
	SET_AUTH,
} from '../types/userTypes';

const initialState: IinitialState = {
	userId: '',
	name: '',
	email: '',
	isAuth: false,
	isLoading: true,
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
				isLoading: false,
				isAuth: true,
				userId: action.userId,
				name: action.name,
				email: action.email,
			};

		case SIGN_OUT_USER: {
			return {
				isLoading: true,
				isAuth: false,
				email: '',
				name: '',
				userId: '',
			};
		}
		case GET_USER_START: {
			return {
				...state,
				isLoading: action.value,
			};
		}

		case GET_USER_FINISH: {
			return {
				...state,
				isLoading: action.value,
			};
		}

		case GET_USER_FAILED: {
			return {
				...state,
				isLoading: action.value,
			};
		}
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

export const signOutUser = (): UserActionTypes => ({
	type: SIGN_OUT_USER,
});

type getUserDataStep = 'start' | 'finish' | 'fail';
const getUserData = (step: getUserDataStep): UserActionTypes => {
	switch (step) {
		case 'start':
			return {
				type: GET_USER_START,
				value: true,
			};
		case 'finish':
			return {
				type: GET_USER_FINISH,
				value: false,
			};

		case 'fail': {
			return {
				type: GET_USER_FAILED,
				value: false,
			};
		}

		default: {
			return {
				type: GET_USER_FAILED,
				value: false,
			};
		}
	}
};
const setIsAuth = (value: boolean): UserActionTypes => ({
	type: SET_AUTH,
	value,
});
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
			dispatch(setIsAuth(true));
			dispatch(getUserData('finish'));
		} catch (err) {
			dispatch(setIsAuth(false));
			dispatch(getUserData('fail'));
			localStorage.removeItem('token');
		}
	};
};
