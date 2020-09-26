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
} from './../types/listsTypes';

const initialState: ListsInitialState = {
	isFetching: false,
	lists: [],
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
				lists: action.lists,
			};
		}

		case CREATE_NEW_LIST: {
			const copyLists = [...state.lists];
			copyLists.push(action.list);

			return {
				...state,
				lists: copyLists,
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

const setListsData = (lists: List[]): ListsActionTypes => ({
	type: FETCH_USER_LISTS,
	lists,
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
				.then((result) => {
					if (result.status) throw result;
					const responseList: List[] = result.lists.map(
						(el: ResponseElement) => {
							return {
								_id: el._id,
								name: el.name,
								color: el.color,
								emoji: el.emoji,
							};
						}
					);
					dispatch(setListsData(responseList));
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
