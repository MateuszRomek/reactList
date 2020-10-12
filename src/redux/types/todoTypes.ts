import { IAddNewTodo } from './listsTypes';
export const SET_CURRENT_TODO = 'SET_CURRENT_TODO';
export const FETCH_USER_TODOS = 'FETCH_USER_TODOS';
export const FETCH_TODOS_FINISHED = 'FETCH_TODOS_FINISHED';
export const FETCH_TODOS_START = 'FETCH_TODOS_START';
export const FETCH_TODOS_FAILED = 'FETCH_TODOS_FAILED';
export const CREATE_NEW_TODO = 'CREATE_NEW_TODO';
export const POST_TODO_START = 'POST_TODO_START';
export const POST_TODO_FINISHED = 'POST_TODO_FINISHED';
export const POST_TODO_FAILED = 'POST_TODO_FAILED';
export const SET_TODOS = 'SET_TODOS';
export const TOGGLE_TODO_CHECKBOX = 'TOGGLE_TODO_CHECKBOX';
export const CHANGE_TODO_NAME = 'CHANGE_TODO_NAME';
export interface Todo {
	title: string;
	isChecked: boolean;
	description: string;
	_id: string;
}

export interface ITodoInitialState {
	todos: Todo[];
	currentTodo: Todo;
}
export interface TodoSelector {
	todo: ITodoInitialState;
}

interface ISetCurrentTodo {
	type: typeof SET_CURRENT_TODO;
	todoId: string;
}
interface IFetchTodosInfo {
	type:
		| typeof FETCH_TODOS_START
		| typeof FETCH_TODOS_FINISHED
		| typeof FETCH_TODOS_FAILED;
}

interface IPostTodoInfo {
	type:
		| typeof POST_TODO_START
		| typeof POST_TODO_FINISHED
		| typeof POST_TODO_FAILED;
}

interface ICreateNewTodo {
	type: typeof CREATE_NEW_TODO;
	title: string;
	_id: string;
}

interface BasicResponseData {
	status: number;
	message: string;
}
export interface CreatedTodoResponse extends BasicResponseData {
	todo: {
		title: string;
		_id: string;
	};
}
export interface FetchTodosResponse extends BasicResponseData {
	todos: Todo[];
}

export interface ISetTodos {
	type: typeof SET_TODOS;
	todos: Todo[];
}
export interface IToggleTodoCheck {
	type: typeof TOGGLE_TODO_CHECKBOX;
	todoId: string;
}

export interface IChangeTodoName {
	type: typeof CHANGE_TODO_NAME;
	newTitle: string;
}

export type TodoActionTypes =
	| ISetTodos
	| ISetCurrentTodo
	| ICreateNewTodo
	| IAddNewTodo
	| IToggleTodoCheck
	| IChangeTodoName;

export type ServerTodoLogActions = IPostTodoInfo | IFetchTodosInfo;
