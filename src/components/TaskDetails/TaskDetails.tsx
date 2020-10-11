import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { TodoSelector } from '../../redux/types/todoTypes';
interface Props {}
const TaskDetailsContainer = styled.div`
	width: 350px;
	background-color: ${({ theme }) => theme.colors.lightGray};
`;
const TaskDetails: React.FC<Props> = () => {
	const currentTodo = useSelector(
		(state: TodoSelector) => state.todo.currentTodo
	);
	return <TaskDetailsContainer>{currentTodo.title}</TaskDetailsContainer>;
};

export default TaskDetails;
