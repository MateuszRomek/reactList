import React, { useEffect } from 'react';
import styled from 'styled-components';
import TasksListTitle from './TasksListTitle.tsx/TasksListTitle';

const TasksListContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2.5rem 2rem;
	width: 100%;
	height: 100vh;
	position: relative;
`;

const TasksList: React.FC = () => {
	useEffect(() => {
		const taskListsContainer = document.querySelector('.tasks');
		taskListsContainer?.addEventListener('click', (e) => {});
	});
	return (
		<TasksListContainer className="tasks">
			<TasksListTitle />
		</TasksListContainer>
	);
};

export default TasksList;
