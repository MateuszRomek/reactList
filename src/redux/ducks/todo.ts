import { Dispatch } from 'react';
import {
	ITodoInitialState,
	TodoActionTypes,
	FETCH_TODOS_START,
	FETCH_TODOS_FINISHED,
	FETCH_TODOS_FAILED,
	CREATE_NEW_TODO,
	CreatedTodoResponse,
	POST_TODO_START,
	POST_TODO_FINISHED,
	POST_TODO_FAILED,
	Todo,
	ServerTodoLogActions,
	SET_TODOS,
	FetchTodosResponse,
} from './../types/todoTypes';
import { addTodo } from './lists';

const initialState: ITodoInitialState = {
	todos: [],
	currentTodo: {
		title: '',
		_id: '',
		isChecked: false,
		description: '',
	},
};

const reducer = (
	state = initialState,
	action: TodoActionTypes
): ITodoInitialState => {
	switch (action.type) {
		case CREATE_NEW_TODO: {
			const { title, _id } = action;
			const todoObj: Todo = {
				description: '',
				isChecked: false,
				title,
				_id,
			};

			return {
				...state,
				todos: [...state.todos, todoObj],
			};
		}

		case SET_TODOS: {
			const { todos } = action;
			return {
				...state,
				todos: todos,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;

const postTodoStart = (): ServerTodoLogActions => ({
	type: POST_TODO_START,
});
const postTodoFinished = (): ServerTodoLogActions => ({
	type: POST_TODO_FINISHED,
});
const postTodoFailed = (): ServerTodoLogActions => ({
	type: POST_TODO_FAILED,
});

const fetchTodosStart = (): ServerTodoLogActions => ({
	type: FETCH_TODOS_START,
});
const fetchTodosFinished = (): ServerTodoLogActions => ({
	type: FETCH_TODOS_FINISHED,
});
const fetchTodosFailed = (): ServerTodoLogActions => ({
	type: FETCH_TODOS_FAILED,
});
const createNewTodo = (_id: string, title: string): TodoActionTypes => ({
	type: CREATE_NEW_TODO,
	_id,
	title,
});
const setTodos = (todos: Todo[]): TodoActionTypes => ({
	type: SET_TODOS,
	todos,
});
export const postNewTodo = (
	token: string | null,
	title: string,
	listId: string
) => {
	return (dispatch: Dispatch<ServerTodoLogActions | TodoActionTypes>) => {
		dispatch(postTodoStart());

		fetch('http://localhost:8080/todo', {
			method: 'POST',
			headers: {
				Authorization: `Bearer  ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				listId,
			}),
		})
			.then((response) => response.json())
			.then((result: CreatedTodoResponse) => {
				if (result.status !== 201) throw result;
				const {
					todo: { _id, title },
				} = result;
				dispatch(postTodoFinished());
				dispatch(createNewTodo(_id, title));
				dispatch(addTodo(_id));
			})
			.catch((e) => {
				dispatch(postTodoFailed());
			});
	};
};

export const fetchUserTodos = (token: string | null) => {
	return (dispatch: Dispatch<ServerTodoLogActions | TodoActionTypes>) => {
		dispatch(fetchTodosStart());
		fetch('http://localhost:8080/todo', {
			method: 'GET',
			headers: {
				Authorization: `Bearer  ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((respone) => respone.json())
			.then((result: FetchTodosResponse) => {
				if (result.status !== 200) throw result;
				dispatch(fetchTodosFinished());
				dispatch(setTodos(result.todos));
			})
			.catch((e) => dispatch(fetchTodosFailed()));
	};
};
