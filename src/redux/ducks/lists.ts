import { Dispatch } from 'react';
import {
	ListsInitialState,
	ListsActionTypes,
	SET_FETCHING,
	FETCH_USER_LISTS,
	ResponseElement,
	List,
	PostListResponse,
	CREATE_NEW_LIST,
	FetchUserListsResult,
} from './../types/listsTypes';

//TODO CHANGE STATE TO TWO LISTS
const initialState: ListsInitialState = {
	isFetching: false,
	defaultLists: [],
	userLists: [],
};

const listsReducer = (state = initialState, action: ListsActionTypes) => {
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
