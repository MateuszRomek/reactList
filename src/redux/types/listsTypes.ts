export const SAVE_LIST_DATA = 'SAVE_LIST_DATA';
export const SET_FETCHING = 'SET_FETCHING';
export const FETCH_USER_LISTS = 'FETCH_USER_LISTS';
export interface List {
	name: string;
	emoji: string;
	color: string;
}

export interface ListsInitialState {
	lists?: {
		[key: string]: List;
	};
	isFetching: boolean;
}

export interface SaveListDat {
	type: typeof SAVE_LIST_DATA;
}

export interface SetFetching {
	type: typeof SET_FETCHING;
	fetching: boolean;
}

export interface ResponseList {
	_id: string;
	name: string;
}

export interface FetchUserLists {
	type: typeof FETCH_USER_LISTS;
	lists: ResponseList[];
}

export type ListsActionTypes = SaveListDat | SetFetching | FetchUserLists;
