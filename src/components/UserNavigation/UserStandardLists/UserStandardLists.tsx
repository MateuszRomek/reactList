import React from 'react';
import styled from 'styled-components';
import List from '../List/List';
import { ReactComponent as SunIcon } from '../../../assets/svg/sunSolid.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/svg/calendarSolid.svg';
import { ReactComponent as HomeIcon } from '../../../assets/svg/homeSolid.svg';
interface Props {
	isSmall: boolean;
}
interface StyledProps {
	isSmall: boolean;
}

const Container = styled.div<StyledProps>`
	margin-top: ${({ isSmall }) => (isSmall ? '5rem' : '0')};
	display: flex;
	width: ${({ isSmall }) => (isSmall ? 'auto' : '100%')};
	flex-direction: column;
	align-items: ${({ isSmall }) => (isSmall ? 'center' : 'flex-start')};
	justify-content: center;
`;

const UserStandardsLists: React.FC<Props> = ({ isSmall }) => {
	return (
		<Container isSmall={isSmall}>
			<List isSmallMenu={isSmall} ListIcon={SunIcon} listName="My Day" />
			<List isSmallMenu={isSmall} ListIcon={CalendarIcon} listName="Planned" />
			<List isSmallMenu={isSmall} ListIcon={HomeIcon} listName="Tasks" />
		</Container>
	);
};

export default UserStandardsLists;
