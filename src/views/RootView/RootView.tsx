import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import UserNavigation from '../../components/UserNavigation/UserNavigation';
import TasksList from '../../components/TasksContainer/TasksContainer';
import { useDispatch, useSelector } from 'react-redux';
import { IlistsReducer } from '../../redux/types/listsTypes';
import { IuserReducer } from '../../redux/types/userTypes';
import { getUserOnRefresh } from '../../redux/ducks/user';
import { TodoSelector } from '../../redux/types/todoTypes';
import TaskDetails from '../../components/TaskDetails/TaskDetails';
const RootGrid = styled.div`
	display: flex;
	flex: 1 1 0px;
	will-change: width;
	height: 100vh;
	overflow: hidden;
`;

const RootViewTemplate: React.FC = () => {
	const currentList = useSelector(
		(state: IlistsReducer) => state.lists.currentList
	);
	const currentTodo = useSelector(
		(state: TodoSelector) => state.todo.currentTodo._id
	);
	const { email, name, userId } = useSelector(
		(state: IuserReducer) => state.user
	);
	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);
	useEffect(() => {
		if (email === '' && name === '' && userId === '') {
			stableDispatch(getUserOnRefresh());
		} else {
			return;
		}
	}, [stableDispatch, email, name, userId]);
	return (
		<RootGrid>
			<UserNavigation />
			{currentList._id === '' && currentList.name === '' ? null : <TasksList />}
			{currentTodo === '' ? null : <TaskDetails />}
		</RootGrid>
	);
};

export default RootViewTemplate;
