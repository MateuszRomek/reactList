export const SET_USER_DATA = 'SET_USER_DATA';
export interface IinitialState {
	userId: string;
	name: string;
}

export interface SetUserData {
	type: typeof SET_USER_DATA;
	userId: string;
	name: string;
}

export type UserActionTypes = SetUserData;

export interface IuserReducer {
	user: IinitialState;
}
