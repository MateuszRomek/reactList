import { listenerCount } from 'process';
import { Dispatch } from 'react';
import findList from '../../utils/findList';
import {
	ListsInitialState,
	ListsActionTypes,
	SET_FETCHING,
	FETCH_USER_LISTS,
	List,
	PostListResponse,
	CREATE_NEW_LIST,
	FetchUserListsResult,
	SetCurrentList,
	SET_CURRENT_LIST,
	CHANGE_LIST_NAME,
	ChangeListName,
	UpdateName,
	UPDATE_LIST_NAME,
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
			const { userLists, currentList } = state;
			const currentListName = userLists.find(
				(list) => list._id === currentList._id
			)?.name;
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

const setListsData = (
	defaultLists: List[],
	userLists: List[]
): ListsActionTypes => ({
	type: FETCH_USER_LISTS,
	defaultLists,
	userLists,
});

export const fetchUserLists = (token: string | null) => {
	return (dispatch: Dispatch<ListsActionTypes>) => {
		dispatch(setFetching(true));
		return (
			fetch('http://localhost:8080/lists', {
				method: 'GET',
				headers: {
					Authorization: `Bearer  ${token}`,
				},
			})
				.then((response) => response.json())
				.then((result: FetchUserListsResult) => {
					if (result.status) throw result;
					const { defaultLists, userLists } = result;

					dispatch(setListsData(defaultLists, userLists));
					dispatch(setFetching(false));
				})
				//TODO dispatch error event
				.catch((err) => {
					console.log(err);
					//message: string, status
				})
		);
	};
};

const createNewList = (list: List): ListsActionTypes => ({
	type: CREATE_NEW_LIST,
	list,
});

export const postNewList = (token: string | null, listName: string) => {
	return (dispatch: Dispatch<ListsActionTypes>) => {
		return fetch('http://localhost:8080/lists/create', {
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
export const setCurrentList = (_id: string): SetCurrentList => ({
	type: SET_CURRENT_LIST,
	_id,
});

export const changeListName = (newName: string): ChangeListName => ({
	type: CHANGE_LIST_NAME,
	newName,
});

export const updateListName = (newName: string | undefined): UpdateName => ({
	type: UPDATE_LIST_NAME,
	newName,
});
