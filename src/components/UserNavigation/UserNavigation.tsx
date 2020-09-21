import React from 'react';
import styled from 'styled-components';
import UserData from './UserData/UserData';
//import SunIcon from '../../assets/svg/sunSolid.svg';
import UserStandardsLists from './UserStandardLists/UserStandardLists';
import { ReactComponent as SunIcon } from '../../assets/svg/sunSolid.svg';

const Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

const UserNavigation: React.FC = () => {
	return (
		<Container>
			<UserData userEmail={'mateusz.romek@outlook.com'} userName="Mateusz" />
			<UserStandardsLists ListIcon={SunIcon} listName={'My Day'} />
		</Container>
	);
};

export default UserNavigation;
