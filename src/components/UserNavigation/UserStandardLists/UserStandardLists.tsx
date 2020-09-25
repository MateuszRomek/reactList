import React from 'react';
import styled from 'styled-components';
import ListComponent from '../List/List';
import { ReactComponent as SunIcon } from '../../../assets/svg/sunSolid.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/svg/calendarSolid.svg';
import { ReactComponent as HomeIcon } from '../../../assets/svg/homeSolid.svg';
import { List } from '../../../redux/types/listsTypes';
interface Props {
	isSmall: boolean;
	defaultLists: List[];
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

const decideListIcon = (listname: string) => {
	switch (listname) {
		case 'My Day': {
			return SunIcon;
		}
		case 'Planned': {
			return CalendarIcon;
		}

		case 'Tasks': {
			return HomeIcon;
		}
		default: {
			return HomeIcon;
		}
	}
};

const UserStandardsLists: React.FC<Props> = ({ defaultLists, isSmall }) => {
	return (
		<Container isSmall={isSmall}>
			{defaultLists.map((list) => {
				return (
					<ListComponent
						key={list._id}
						isSmallMenu={isSmall}
						listName={list.name}
						ListIcon={decideListIcon(list.name)}
					/>
				);
			})}
		</Container>
	);
};

export default UserStandardsLists;
