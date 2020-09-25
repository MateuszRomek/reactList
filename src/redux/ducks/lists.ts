import { Dispatch } from 'react';
import {
	ListsInitialState,
	ListsActionTypes,
	SET_FETCHING,
	FETCH_USER_LISTS,
	ResponseElement,
	List,
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
				.then((result) => result.json())
				.then((data) => {
					const responseList: List[] = data.lists.map((el: ResponseElement) => {
						return {
							_id: el._id,
							name: el.name,
							color: el.color,
							emoji: el.emoji,
						};
					});
					dispatch(setListsData(responseList));
					dispatch(setFetching(false));
				})
				//TODO dispatch error event
				.catch((err) => {})
		);
	};
};
