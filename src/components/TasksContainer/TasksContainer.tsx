import React, { useEffect } from 'react';
import styled from 'styled-components';
import TasksListTitle from './TasksListTitle.tsx/TasksListTitle';
import AddNewTask from './AddNewTask/AddNewTask';
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
	// useEffect(() => {
	// 	const taskListsContainer = document.querySelector('.tasks');
	// 	taskListsContainer?.addEventListener('click', (e) => {});
	// });
	return (
		<Container className="tasks">
			<TasksListTitle />
			<TasksListContainer></TasksListContainer>
			<AddNewTask />
		</Container>
	);
};

export default TasksContainer;
