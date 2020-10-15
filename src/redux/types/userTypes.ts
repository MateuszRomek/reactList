export const SET_USER_DATA = 'SET_USER_DATA';
export const GET_USER_START = 'GET_USER_START';
export const GET_USER_FINISH = 'GET_USER_FINISH';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export interface IinitialState {
	userId: string;
	name: string;
	email: string;
}

export interface ISetUserData {
	type: typeof SET_USER_DATA;
	userId: string;
	name: string;
	email: string;
}

export interface IGetUserDataStart {
	type: typeof GET_USER_START;
}
export interface IGetUserDataFinished {
	type: typeof GET_USER_FINISH;
}

export interface IGetUserDataFailed {
	type: typeof GET_USER_FAILED;
}

export interface ISignOutUser {
	type: typeof SIGN_OUT_USER;
}
export type UserActionTypes =
	| ISetUserData
	| IGetUserDataStart
	| IGetUserDataFailed
	| IGetUserDataFinished
	| ISignOutUser;

export interface IuserReducer {
	user: IinitialState;
}
