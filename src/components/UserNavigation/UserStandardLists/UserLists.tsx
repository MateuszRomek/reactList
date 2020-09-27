import React from 'react';
import styled from 'styled-components';
import ListComponent from '../List/List';
import SunIcon from '../../../assets/svg/sunSolid.svg';
import CalendarIcon from '../../../assets/svg/calendarSolid.svg';
import HomeIcon from '../../../assets/svg/homeSolid.svg';
import { List } from '../../../redux/types/listsTypes';
interface Props {
	isSmall: boolean;
	isDefaultLists: boolean;
	listsArray: List[];
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

const UserStandardsLists: React.FC<Props> = ({
	listsArray,
	isSmall,
	isDefaultLists,
}) => {
	return (
		<Container isSmall={isSmall}>
			{isDefaultLists
				? listsArray.map((list) => {
						return (
							<ListComponent
								key={list._id}
								isSmallMenu={isSmall}
								listName={list.name}
								listIcon={decideListIcon(list.name)}
							/>
						);
				  })
				: listsArray.map((list) => {
						return (
							<ListComponent
								key={list._id}
								isSmallMenu={isSmall}
								listName={list.name}
								listEmoji={list.emoji}
							/>
						);
				  })}
		</Container>
	);
};

export default UserStandardsLists;
