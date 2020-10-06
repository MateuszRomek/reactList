import React, { useState } from 'react';
import styled from 'styled-components';
import TasksListTitle from './TasksListTitle.tsx/TasksListTitle';
import AddNewTask from './AddNewTask/AddNewTask';
import SelectEmoji from './SelectEmoji/SelectEmoji';
import { useSelector } from 'react-redux';
import { IlistsReducer } from '../../redux/types/listsTypes';
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
	return (
		<Container className="tasks">
			<TasksListTitle
				selectedList={selectedList}
				setEmojiActive={setEmojiActive}
				setTopPosition={setTopPosition}
			/>
			<TasksListContainer></TasksListContainer>
			<AddNewTask />
			<SelectEmoji
				listId={selectedList._id}
				top={topPosition}
				isEmojiActive={isEmojiActive}
				setEmojiActive={setEmojiActive}
			/>
		</Container>
	);
};

export default TasksContainer;
