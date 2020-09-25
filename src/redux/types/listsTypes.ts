export const SAVE_LIST_DATA = 'SAVE_LIST_DATA';
export const SET_FETCHING = 'SET_FETCHING';
export const FETCH_USER_LISTS = 'FETCH_USER_LISTS';

//TODO ADD TODO ARRAY
export interface List {
	name: string;
	emoji: string;
	color: string;
	_id: string;
}

export interface ListsInitialState {
	lists: List[];
	isFetching: boolean;
}

export interface SaveListDat {
	type: typeof SAVE_LIST_DATA;
}

export interface SetFetching {
	type: typeof SET_FETCHING;
	fetching: boolean;
}

export interface FetchUserLists {
	type: typeof FETCH_USER_LISTS;
	lists: List[];
}

export type ListsActionTypes = SaveListDat | SetFetching | FetchUserLists;

export interface ResponseElement {
	createdAt: string;
	name: string;
	todos: [];
	updatedAt: string;
	userId: string;
	__v: number;
	color: string;
	emoji: string;
	_id: string;
}

export interface IlistsReducer {
	lists: ListsInitialState;
}
