import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TodoSelector } from '../../redux/types/todoTypes';
import TaskTitle from './TaskTitle/TaskTitle';
interface Props {}
const TaskDetailsContainer = styled.div`
	height: 100%;
	width: 350px;
	background-color: ${({ theme }) => theme.colors.lightGray};
	padding: 1.5rem;
	border-left: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
`;
const TaskDetails: React.FC<Props> = () => {
	const currentTodo = useSelector(
		(state: TodoSelector) => state.todo.currentTodo
	);
	return (
		<TaskDetailsContainer>
			<TaskTitle taskTitle={currentTodo.title} />
		</TaskDetailsContainer>
	);
};

export default TaskDetails;
