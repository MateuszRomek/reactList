export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export interface IinitialState {
	userId: string;
	isToken: boolean;
	name: string;
}

export interface SetUserData {
	type: typeof SET_USER_DATA;
	userId: string;
	name: string;
}

export interface SetTokenBool {
	type: typeof SET_USER_TOKEN;
	isToken: boolean;
}

export type UserActionTypes = SetUserData | SetTokenBool;
