import React, { useState } from 'react';
import styled from 'styled-components';
import TasksListTitle from './TasksListTitle.tsx/TasksListTitle';
import AddNewTask from './AddNewTask/AddNewTask';
import SelectEmoji from './SelectEmoji/SelectEmoji';
import { useSelector } from 'react-redux';
import { IlistsReducer } from '../../redux/types/listsTypes';
import { TodoSelector } from '../../redux/types/todoTypes';
const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 2.5rem 2rem;
	width: 100%;
	height: 100vh;
	position: relative;
`;

const TasksListContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem;
`;

const TasksContainer: React.FC = () => {
	const [isEmojiActive, setEmojiActive] = useState(false);
	const [topPosition, setTopPosition] = useState('0');
	const selectedList = useSelector(
		(state: IlistsReducer) => state.lists.currentList
	);
	const todos = useSelector((state: TodoSelector) => state.todo.todos);

	return (
		<Container className="tasks">
			<TasksListTitle
				selectedList={selectedList}
				setEmojiActive={setEmojiActive}
				setTopPosition={setTopPosition}
			/>
			<TasksListContainer>
				{/*
				//TODO Create Todo item and display it in proper way.
				{todos
					.filter(({ _id }) => selectedList.todos.indexOf(_id) > -1)
					.map((todo) => (
						<div>{todo.title}</div>
					))} */}
			</TasksListContainer>
			<AddNewTask listId={selectedList._id} />
			<SelectEmoji
				selectedList={selectedList}
				top={topPosition}
				isEmojiActive={isEmojiActive}
				setEmojiActive={setEmojiActive}
			/>
		</Container>
	);
};

export default TasksContainer;
