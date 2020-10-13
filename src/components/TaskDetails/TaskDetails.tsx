import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TodoSelector } from '../../redux/types/todoTypes';
import HideButton from './HideButton/HideButton';
import TaskTitle from './TaskTitle/TaskTitle';
import TaskDescription from './TaskDescription/TaskDescription';
interface Props {}
const TaskDetailsContainer = styled.div`
	height: 100%;
	position: relative;
	width: 350px;
	background-color: ${({ theme }) => theme.colors.lightGray};
	padding: 1.5rem;
	border-left: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	overflow: hidden;
`;
const Overflow = styled.div`
	height: 100%;
	overflow-y: auto;
	padding: 0.1rem 0.1rem 6.7rem 0.1rem;
`;
const TaskDetails: React.FC<Props> = () => {
	const currentTodo = useSelector(
		(state: TodoSelector) => state.todo.currentTodo
	);
	return (
		<TaskDetailsContainer>
			<Overflow>
				<TaskTitle todoId={currentTodo._id} taskTitle={currentTodo.title} />
				<TaskDescription
					taskDesc={currentTodo.description}
					todoId={currentTodo._id}
				/>
			</Overflow>
			<HideButton />
		</TaskDetailsContainer>
	);
};

export default TaskDetails;
