import { Dispatch } from 'react';
import {
	ListsInitialState,
	ListsActionTypes,
	SET_FETCHING,
	FETCH_USER_LISTS,
	ResponseList,
} from './../types/listsTypes';

const initialState: ListsInitialState = {
	isFetching: false,
};

const listsReducer = (state = initialState, action: ListsActionTypes) => {
	switch (action.type) {
		case SET_FETCHING: {
			return {
				...state,
				isFetching: action.fetching,
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

const setListsData = (lists: ResponseList[]): ListsActionTypes => ({
	type: FETCH_USER_LISTS,
	lists,
});

//TODO set lists state + manipulate data response to match ResponseList type
export const fetchUserLists = (token: string | null) => {
	return (dispatch: Dispatch<ListsActionTypes>) => {
		dispatch(setFetching(true));
		return fetch('http://localhost:8080/lists', {
			method: 'GET',
			headers: {
				Authorization: `Bearer  ${token}`,
			},
		})
			.then((result) => result.json())
			.then((data) => console.log(data));
	};
};
