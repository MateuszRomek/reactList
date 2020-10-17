import { Dispatch } from 'react';
import findList from '../../utils/findList';
import { getLocalStorageItem } from '../../utils/getLocalStorageItem';
import { TodoActionTypes } from '../types/todoTypes';
import {
	ListsInitialState,
	ListsActionTypes,
	SET_FETCHING,
	FETCH_USER_LISTS,
	List,
	PostListResponse,
	CREATE_NEW_LIST,
	FetchUserListsResult,
	ISetCurrentList,
	SET_CURRENT_LIST,
	CHANGE_LIST_NAME,
	IChangeListName,
	IUpdateName,
	UPDATE_LIST_NAME,
	IUpdateListDataStart,
	UPDATE_LIST_DATA_START,
	UPDATE_LIST_DATA_SUCCESS,
	IUpdateListDataSuccess,
	UPDATE_LIST_DATA_FAILED,
	IUpdateListDataFail,
	UpdateListDataResponse,
	UPDATE_LIST_ALL_DATA,
	UPDATE_LIST_EMOJI,
	ADD_TODO_TO_LIST,
	ServerListLogActions,
	POST_DELETE_LIST,
	IPostDeletList,
	DELETE_LIST,
} from './../types/listsTypes';

const initialState: ListsInitialState = {
	isFetching: false,
	defaultLists: [],
	userLists: [],
	currentList: {
		_id: '',
		color: '',
		emoji: '',
		isDefaultList: false,
		name: '',
		todos: [],
	},
};

const listsReducer = (
	state = initialState,
	action: ListsActionTypes
): ListsInitialState => {
	switch (action.type) {
		case SET_FETCHING: {
			return {
				...state,
				isFetching: action.fetching,
			};
		}

		case FETCH_USER_LISTS: {
			return {
				...state,
				defaultLists: action.defaultLists,
				userLists: action.userLists,
			};
		}

		case CREATE_NEW_LIST: {
			const copyLists = [...state.userLists];
			copyLists.push(action.list);

			return {
				...state,
				userLists: copyLists,
			};
		}

		case SET_CURRENT_LIST: {
			const { defaultLists, userLists } = state;
			const selectedList = findList(action._id, defaultLists, userLists);
			return {
				...state,
				currentList: selectedList,
			};
		}
		case CHANGE_LIST_NAME: {
			const { newName } = action;

			return {
				...state,
				currentList: {
					...state.currentList,
					name: newName,
				},
			};
		}

		case UPDATE_LIST_NAME: {
			const { newName } = action;
			if (newName === undefined) return { ...state };
			const { userLists, currentList } = { ...state };
			const currentListName = currentList.name;
			if (currentListName !== newName) {
				const userListsCopy = userLists.map((list) => {
					if (list._id === currentList._id) {
						list.name = newName;
					}
					return list;
				});
				return {
					...state,
					userLists: userListsCopy,
				};
			} else {
				return {
					...state,
				};
			}
		}

		case UPDATE_LIST_EMOJI: {
			const { newEmoji } = action;
			const { emoji } = state.currentList;
			if (newEmoji === emoji) return { ...state };
			const { userLists, currentList } = { ...state };
			const userListsCopy = userLists.map((list) => {
				if (list._id === currentList._id) {
					list.emoji = newEmoji;
				}
				return list;
			});
			console.log(userListsCopy);
			return {
				...state,
			};
		}

		case UPDATE_LIST_ALL_DATA: {
			const {
				_id,
				color,
				emoji,
				isDefaultList,
				name,
				todos,
			} = state.currentList;
			if (_id === '') return { ...state };
			const { defaultLists, userLists } = state;
			const listIndex = isDefaultList
				? defaultLists.findIndex((list) => list._id === _id)
				: userLists.findIndex((list) => list._id === _id);
			const copyLists = isDefaultList ? [...defaultLists] : [...userLists];
			copyLists[listIndex] = {
				_id,
				color,
				emoji,
				isDefaultList,
				name,
				todos,
			};
			if (isDefaultList) {
				return {
					...state,
					defaultLists: copyLists,
				};
			} else {
				return {
					...state,
					userLists: copyLists,
				};
			}
		}
		case ADD_TODO_TO_LIST: {
			const { todoId } = action;
			return {
				...state,
				currentList: {
					...state.currentList,
					todos: [...state.currentList.todos, todoId],
				},
			};
		}

		case DELETE_LIST: {
			const { listId } = action;
			const userListsCopy = state.userLists.filter(
				(list) => list._id !== listId
			);
			return {
				...state,
				currentList: {
					_id: '',
					color: '',
					emoji: '',
					isDefaultList: false,
					name: '',
					todos: [],
				},
				userLists: userListsCopy,
			};
		}

		default: {
			return {
				...state,
			};
		}
	}
};

export default listsReducer;

export const setFetching = (fetching: boolean): ListsActionTypes => ({
	type: SET_FETCHING,
	fetching,
});

export const setCurrentList = (_id: string): ISetCurrentList => ({
	type: SET_CURRENT_LIST,
	_id,
});

export const changeListName = (newName: string): IChangeListName => ({
	type: CHANGE_LIST_NAME,
	newName,
});

const setListsData = (
	defaultLists: List[],
	userLists: List[]
): ListsActionTypes => ({
	type: FETCH_USER_LISTS,
	defaultLists,
	userLists,
});

export const fetchUserLists = () => {
	return (dispatch: Dispatch<ListsActionTypes>) => {
		dispatch(setFetching(true));
		const token = getLocalStorageItem('token');
		return fetch('http://localhost:8080/lists', {
			method: 'GET',
			headers: {
				Authorization: `Bearer  ${token}`,
			},
		})
			.then((response) => response.json())
			.then((result: FetchUserListsResult) => {
				if (result.status) throw result;
				const { defaultLists, userLists, currentList } = result;
				dispatch(setListsData(defaultLists, userLists));
				dispatch(setFetching(false));
				if (currentList !== '') {
					dispatch(setCurrentList(currentList));
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
};

const createNewList = (list: List): ListsActionTypes => ({
	type: CREATE_NEW_LIST,
	list,
});

export const postNewList = (listName: string) => {
	return (dispatch: Dispatch<ListsActionTypes>) => {
		const token = getLocalStorageItem('token');

		return fetch('http://localhost:8080/lists', {
			method: 'POST',
			headers: {
				Authorization: `Bearer  ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				listName,
			}),
		})
			.then((response) => response.json())
			.then((result: PostListResponse) => {
				if (result.status !== 201) throw result;

				dispatch(createNewList(result.list));
			})
			.catch((err) => console.log(err));
	};
};

export const updateListName = (newName: string | undefined): IUpdateName => ({
	type: UPDATE_LIST_NAME,
	newName,
});

const updateListDataStart = (): IUpdateListDataStart => ({
	type: UPDATE_LIST_DATA_START,
});

const updateListDataSuccess = (): IUpdateListDataSuccess => ({
	type: UPDATE_LIST_DATA_SUCCESS,
});
const updateListDataFailed = (): IUpdateListDataFail => ({
	type: UPDATE_LIST_DATA_FAILED,
});

const logPostDeleteList = (): IPostDeletList => ({
	type: POST_DELETE_LIST,
});
export const postUpdateListData = (list: List) => {
	return (dispatch: Dispatch<ServerListLogActions>) => {
		dispatch(updateListDataStart());
		const token = getLocalStorageItem('token');

		return fetch('http://localhost:8080/lists', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer  ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				listObj: list,
				listId: list._id,
			}),
		})
			.then((response) => response.json())
			.then((result: UpdateListDataResponse) => {
				if (result.status !== 200) throw result;
				dispatch(updateListDataSuccess());
			})
			.catch((err) => {
				console.log(err);
				dispatch(updateListDataFailed());
			});
	};
};
export const deleteList = (listId: string): ListsActionTypes => ({
	type: DELETE_LIST,
	listId,
});

export const postDeleteList = (listId: string) => {
	return (dispatch: Dispatch<ServerListLogActions>) => {
		dispatch(logPostDeleteList());
		const token = getLocalStorageItem('token');

		return fetch('http://localhost:8080/lists', {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer  ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				deleteId: listId,
			}),
		});
	};
};

export const updateList = (): ListsActionTypes => ({
	type: UPDATE_LIST_ALL_DATA,
});

export const updateListEmoji = (newEmoji: string): ListsActionTypes => ({
	type: UPDATE_LIST_EMOJI,
	newEmoji,
});

export const addTodo = (todoId: string): TodoActionTypes => ({
	type: ADD_TODO_TO_LIST,
	todoId,
});
