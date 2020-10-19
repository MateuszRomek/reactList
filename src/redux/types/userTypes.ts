export const SET_USER_DATA = 'SET_USER_DATA';
export const GET_USER_START = 'GET_USER_START';
export const GET_USER_FINISH = 'GET_USER_FINISH';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const SET_AUTH = 'SET_AUTH';
export interface IinitialState {
	userId: string;
	name: string;
	email: string;
	isAuth: boolean;
	isLoading: boolean;
}

export interface ISetUserData {
	type: typeof SET_USER_DATA;
	userId: string;
	name: string;
	email: string;
}

export interface IGetUserDataStart {
	type: typeof GET_USER_START;
	value: boolean;
}
export interface IGetUserDataFinished {
	type: typeof GET_USER_FINISH;
	value: boolean;
}

export interface IGetUserDataFailed {
	type: typeof GET_USER_FAILED;
	value: boolean;
}

export interface ISignOutUser {
	type: typeof SIGN_OUT_USER;
}
export interface IsetAuth {
	type: typeof SET_AUTH;
	value: boolean;
}
export type UserActionTypes =
	| ISetUserData
	| IGetUserDataStart
	| IGetUserDataFailed
	| IGetUserDataFinished
	| ISignOutUser
	| IsetAuth;

export interface IuserReducer {
	user: IinitialState;
}
