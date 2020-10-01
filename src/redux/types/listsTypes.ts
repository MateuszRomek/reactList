export const SAVE_LIST_DATA = 'SAVE_LIST_DATA';
export const UPDATE_LIST_DATA_START = 'UPDATE_LIST_DATA_START';
export const UPDATE_LIST_DATA_SUCCESS = 'UPDATE_LIST_DATA_SUCCESS';
export const UPDATE_LIST_DATA_FAILED = 'UPDATE_LIST_DATA_FAILED';
export const SET_FETCHING = 'SET_FETCHING';
export const FETCH_USER_LISTS = 'FETCH_USER_LISTS';
export const CREATE_NEW_LIST = 'CREATE_NEW_LIST';
export const UPDATE_LIST_NAME = 'UPDATE_LIST_NAME';
export const SET_CURRENT_LIST = 'SET_CURRENT_LIST';
export const CHANGE_LIST_NAME = 'CHANGE_LIST_NAME';
export const UPDATE_LIST_ALL_DATA = 'UPDATE_LIST_ALL_DATA';
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

export interface FetchUserListsResult {
	message: string;
	defaultLists: List[];
	userLists: List[];
	status?: number;
}

export interface IlistsReducer {
	lists: ListsInitialState;
}

export interface PostListResponse {
	message: string;
	status: number;
	list: List;
}
export interface UpdateListDataResponse {
	message: string;
	status: number;
	updated?: string;
	listId?: string;
}
export interface ISaveListDat {
	type: typeof SAVE_LIST_DATA;
}

export interface ISetFetching {
	type: typeof SET_FETCHING;
	fetching: boolean;
}

export interface IFetchUserLists {
	type: typeof FETCH_USER_LISTS;
	defaultLists: List[];
	userLists: List[];
}

export interface ICreateNewList {
	type: typeof CREATE_NEW_LIST;
	list: List;
}

export interface ISetCurrentList {
	type: typeof SET_CURRENT_LIST;
	_id: string;
}

export interface IChangeListName {
	type: typeof CHANGE_LIST_NAME;
	newName: string;
}

export interface IUpdateName {
	type: typeof UPDATE_LIST_NAME;
	newName: string | undefined;
}

export interface IUpdateListDataStart {
	type: typeof UPDATE_LIST_DATA_START;
}
export interface IUpdateListDataFail {
	type: typeof UPDATE_LIST_DATA_FAILED;
}
export interface IUpdateListDataSuccess {
	type: typeof UPDATE_LIST_DATA_SUCCESS;
}

export interface IUpdateList {
	type: typeof UPDATE_LIST_ALL_DATA;
}

export type ListsActionTypes =
	| ISaveListDat
	| ISetFetching
	| IFetchUserLists
	| ICreateNewList
	| ISetCurrentList
	| IChangeListName
	| IUpdateName
	| IUpdateListDataStart
	| IUpdateListDataSuccess
	| IUpdateListDataFail
	| IUpdateList;
