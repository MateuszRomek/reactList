export const SET_USER_DATA = 'SET_USER_DATA';
export const GET_USER_START = 'GET_USER_START';
export const GET_USER_FINISH = 'GET_USER_FINISH';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export interface IinitialState {
	userId: string;
	name: string;
	email: string;
}

export interface SetUserData {
	type: typeof SET_USER_DATA;
	userId: string;
	name: string;
	email: string;
}

export interface GetUserDataStart {
	type: typeof GET_USER_START;
}
export interface GetUserDataFinished {
	type: typeof GET_USER_FINISH;
}

export interface GetUserDataFailed {
	type: typeof GET_USER_FAILED;
}
export type UserActionTypes =
	| SetUserData
	| GetUserDataStart
	| GetUserDataFinished
	| GetUserDataFailed;

export interface IuserReducer {
	user: IinitialState;
}
