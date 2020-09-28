export const SAVE_LIST_DATA = 'SAVE_LIST_DATA';
export const SET_FETCHING = 'SET_FETCHING';
export const FETCH_USER_LISTS = 'FETCH_USER_LISTS';
export const CREATE_NEW_LIST = 'CREATE_NEW_LIST';
export const UPDATE_LIST_NAME = 'UPDATE_LIST_NAME';
export const SET_CURRENT_LIST = 'SET_CURRENT_LIST';
export const CHANGE_LIST_NAME = 'CHANGE_LIST_NAME';
export interface List {
	name: string;
	emoji: string;
	color: string;
	_id: string;
	todos: [];
	isDefaultList: boolean;
}

export interface ListsInitialState {
	defaultLists: List[];
	userLists: List[];
	isFetching: boolean;
	currentList: List;
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

export interface SetCurrentList {
	type: typeof SET_CURRENT_LIST;
	_id: string;
}

export interface ChangeListName {
	type: typeof CHANGE_LIST_NAME;
	newName: string;
}

export interface UpdateName {
	type: typeof UPDATE_LIST_NAME;
	newName: string | undefined;
}

export type ListsActionTypes =
	| SaveListDat
	| SetFetching
	| FetchUserLists
	| CreateNewList
	| SetCurrentList
	| ChangeListName
	| UpdateName;
