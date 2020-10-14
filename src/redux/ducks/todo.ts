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
	TOGGLE_TODO_CHECKBOX,
	SET_CURRENT_TODO,
	CHANGE_TODO_NAME,
	RESET_CURRENT_TODO,
	CHANGE_TODO_DESC,
} from './../types/todoTypes';
import { addTodo } from './lists';

const initialState: ITodoInitialState = {
	todos: [],
	currentTodo: {
		title: '',
		_id: '',
		isChecked: false,
		description: '',
		deadline: '',
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
				deadline: '',
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

		case TOGGLE_TODO_CHECKBOX: {
			const { todoId } = action;
			const todosCopy = [...state.todos].map((todo) => {
				if (todo._id === todoId) {
					todo.isChecked = !todo.isChecked;
					return todo;
				} else {
					return todo;
				}
			});
			return {
				...state,
				todos: todosCopy,
			};
		}

		case SET_CURRENT_TODO: {
			const { todoId } = action;
			const todo = state.todos.find((todo) => todo._id === todoId);
			if (todo === undefined) {
				return { ...state };
			} else {
				return {
					...state,
					currentTodo: todo,
				};
			}
		}

		case CHANGE_TODO_NAME:
			const { newTitle } = action;
			if (newTitle === undefined) return { ...state };
			const { currentTodo, todos } = state;
			if (newTitle !== currentTodo.title) {
				const todosCopy = todos.map((todo: Todo) => {
					if (todo._id === currentTodo._id) {
						todo.title = newTitle;
					}
					return todo;
				});
				return {
					...state,
					currentTodo: {
						...state.currentTodo,
						title: newTitle,
					},
					todos: todosCopy,
				};
			} else {
				return {
					...state,
				};
			}

		case RESET_CURRENT_TODO: {
			const clearTodo: Todo = {
				title: '',
				_id: '',
				isChecked: false,
				description: '',
				deadline: '',
			};
			return {
				...state,
				currentTodo: clearTodo,
			};
		}

		case CHANGE_TODO_DESC: {
			const { newDesc } = action;
			if (newDesc === undefined) return { ...state };
			const { currentTodo, todos } = state;
			if (newDesc !== currentTodo.description) {
				const todosCopy = todos.map((todo: Todo) => {
					if (todo._id === currentTodo._id) {
						todo.description = newDesc;
					}
					return todo;
				});
				return {
					...state,
					currentTodo: {
						...state.currentTodo,
						description: newDesc,
					},
					todos: todosCopy,
				};
			} else {
				return {
					...state,
				};
			}
		}

		default: {
			return state;
		}
	}
};

export default reducer;

export const resetCurrentTodo = () => ({
	type: RESET_CURRENT_TODO,
});
export const changeTodoDesc = (newDesc: string): TodoActionTypes => ({
	type: CHANGE_TODO_DESC,
	newDesc,
});
export const changeTodoname = (newTitle: string): TodoActionTypes => ({
	type: CHANGE_TODO_NAME,
	newTitle,
});
export const setCurrentTodo = (todoId: string): TodoActionTypes => ({
	type: SET_CURRENT_TODO,
	todoId,
});

export const toggleCheckTodo = (todoId: string): TodoActionTypes => ({
	type: TOGGLE_TODO_CHECKBOX,
	todoId,
});

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
export const postUpdateTodo = (
	token: string | null,
	todoId: string,
	modelField: string,
	value: string
): void => {
	fetch('http://localhost:8080/todo', {
		method: 'PUT',
		headers: {
			Authorization: `Bearer  ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			todoId,
			modelField,
			value,
		}),
	});
};
