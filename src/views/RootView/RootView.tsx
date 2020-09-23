import React from 'react';
import styled from 'styled-components';
import UserNavigation from '../../components/UserNavigation/UserNavigation';
import TasksList from '../../components/TasksList/TasksList';
const RootGrid = styled.div`
	display: flex;
	flex: 1 1 0px;
	will-change: width;
	height: 100vh;
	overflow: hidden;
`;

const RootViewTemplate: React.FC = () => {
	return (
		<RootGrid>
			<UserNavigation />
			<TasksList />
		</RootGrid>
	);
};

export default RootViewTemplate;
