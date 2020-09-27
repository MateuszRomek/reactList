export const SAVE_LIST_DATA = 'SAVE_LIST_DATA';
export const SET_FETCHING = 'SET_FETCHING';
export const FETCH_USER_LISTS = 'FETCH_USER_LISTS';
export const CREATE_NEW_LIST = 'CREATE_NEW_LIST';
//TODO ADD TODO ARRAY
export interface List {
	name: string;
	emoji: string;
	color: string;
	_id: string;
	todos: [];
}

export interface ListsInitialState {
	defaultLists: List[];
	userLists: List[];
	isFetching: boolean;
}

export interface SaveListDat {
	type: typeof SAVE_LIST_DATA;
}

export interface SetFetching {
	type: typeof SET_FETCHING;
	fetching: boolean;
}
export interface FetchUserListsResult {
	message: string;
	defaultLists: List[];
	userLists: List[];
	status?: number;
}
export interface FetchUserLists {
	type: typeof FETCH_USER_LISTS;
	defaultLists: List[];
	userLists: List[];
}

export interface IlistsReducer {
	lists: ListsInitialState;
}

export interface CreateNewList {
	type: typeof CREATE_NEW_LIST;
	list: List;
}

export interface PostListResponse {
	message: string;
	status: number;
	list: List;
}

export type ListsActionTypes =
	| SaveListDat
	| SetFetching
	| FetchUserLists
	| CreateNewList;
