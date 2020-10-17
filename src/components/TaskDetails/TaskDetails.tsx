import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TodoSelector } from '../../redux/types/todoTypes';
import ActionButton from './TaskActionButton/TaskActionButton';
import TaskTitle from './TaskTitle/TaskTitle';
import TaskDescription from './TaskDescription/TaskDescription';
import TaskDeadline from './TaskDeadline/TaskDeadline';
import { IlistsReducer } from '../../redux/types/listsTypes';
import { ReactComponent as RightChevron } from '../../assets/svg/chevron.svg';
import { ReactComponent as BinIcon } from '../../assets/svg/trash.svg';
import { handlePostDeleteTodo, resetCurrentTodo } from '../../redux/ducks/todo';

interface Props {}
const TaskDetailsContainer = styled.div`
	height: 100%;
	position: relative;
	width: 350px;
	background-color: ${({ theme }) => theme.colors.lightGray};
	padding: 1.5rem;
	border-left: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	overflow: hidden;
	@media (max-width: 950px) {
		position: fixed;
		top: 0;
		right: 0;
		width: 300px;
		z-index: 1000;
	}
`;
const Overflow = styled.div`
	height: 100%;
	overflow-y: auto;
	padding: 0.1rem 0.1rem 6.7rem 0.1rem;
`;

const FooterContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 20;
	padding: 1rem 1rem 1.5rem 1rem;
	background-color: ${({ theme }) => theme.colors.lightGray};
	border-top: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
`;

const TaskDetails: React.FC<Props> = () => {
	const currentTodo = useSelector(
		(state: TodoSelector) => state.todo.currentTodo
	);
	const currentListId = useSelector(
		(state: IlistsReducer) => state.lists.currentList._id
	);
	const dispatch = useDispatch();
	return (
		<TaskDetailsContainer>
			<Overflow>
				<TaskTitle
					currentListId={currentListId}
					todoId={currentTodo._id}
					taskTitle={currentTodo.title}
				/>
				<TaskDeadline
					currentListId={currentListId}
					todoId={currentTodo._id}
					todoDeadline={currentTodo.deadline}
				/>

				<TaskDescription
					currentListId={currentListId}
					taskDesc={currentTodo.description}
					todoId={currentTodo._id}
				/>
			</Overflow>
			<FooterContainer>
				<ActionButton Icon={RightChevron} reduxAction={resetCurrentTodo} />
				<span onClick={() => dispatch(handlePostDeleteTodo(currentTodo._id))}>
					<ActionButton Icon={BinIcon} color="red" />
				</span>
			</FooterContainer>
		</TaskDetailsContainer>
	);
};

export default TaskDetails;
