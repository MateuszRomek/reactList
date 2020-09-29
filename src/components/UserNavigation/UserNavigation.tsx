import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import UserData from './UserData/UserData';
import UserLists from './UserStandardLists/UserLists';
import AddNewList from './AddNewList/AddNewList';
import { useDispatch, useSelector } from 'react-redux';
import { UiReducer } from '../../redux/types/uiTypes';
import { toggleSideNavigation } from '../../redux/ducks/ui';
import { ReactComponent as GripIcon } from '../../assets/svg/gripLines.svg';
import { IuserReducer } from '../../redux/types/userTypes';
import { fetchUserLists } from '../../redux/ducks/lists';
import { IlistsReducer } from '../../redux/types/listsTypes';
interface StyledProps {
	isSmallSideNav: boolean;
}
const Container = styled.div<StyledProps>`
	position: relative;
	display: flex;
	flex: 280px 1 50px;
	transition: width 0.2s;
	width: ${({ isSmallSideNav }) => (isSmallSideNav ? '50px' : '280px')};
	height: 100%;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	border-right: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	background-color: ${({ theme }) => theme.colors.lightGray};
	overflow: hidden;
`;

const SideMenuButton = styled.button<StyledProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	display: block;
	border: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	background-color: inherit;
	padding: 0.6rem;
	border-radius: 3px;
	transition: background-color 0.2s ease-in-out;
	&:hover {
		cursor: pointer;
		background-color: ${({ theme }) => theme.colors.hoverListLight};
		border: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.09), 0 1px 1px rgba(0, 0, 0, 0.08);
	}
	&:active {
		outline: none;
	}
	&:focus {
		outline: none;
	}

	& svg {
		display: block;
		width: 1.8rem;
		height: 1.8rem;
	}
`;
const ButtonContainer = styled.div<StyledProps>`
	width: ${({ isSmallSideNav }) => (isSmallSideNav ? '50px' : '280px')};
	display: flex;
	justify-content: ${({ isSmallSideNav }) =>
		isSmallSideNav ? 'center' : 'flex-start'};
	align-items: center;
	padding: 1rem 0.9rem 0;
`;
const UserNavigation: React.FC = () => {
	const isSmallSideNav = useSelector(
		(state: UiReducer) => state.ui.sideNavigation.isSmall
	);
	const user = useSelector((state: IuserReducer) => state.user);
	const listsState = useSelector((state: IlistsReducer) => state.lists);

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);
	useEffect(() => {
		const width = window.innerWidth;
		if (width < 600) {
			stableDispatch(toggleSideNavigation());
		}
	}, [stableDispatch]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		stableDispatch(fetchUserLists(token));
	}, [stableDispatch]);

	return (
		<Container isSmallSideNav={isSmallSideNav}>
			<ButtonContainer isSmallSideNav={isSmallSideNav}>
				<SideMenuButton
					isSmallSideNav={isSmallSideNav}
					onClick={() => dispatch(toggleSideNavigation())}
				>
					<GripIcon />
				</SideMenuButton>
			</ButtonContainer>

			<UserData
				isSmall={isSmallSideNav}
				userEmail={user.email}
				userName={user.name}
			/>
			<UserLists
				isMarginTop={true}
				isDefaultLists={true}
				listsArray={listsState.defaultLists}
				isSmall={isSmallSideNav}
			/>
			{listsState.userLists.length > 0 ? (
				<UserLists
					isMarginTop={false}
					isDefaultLists={false}
					listsArray={listsState.userLists}
					isSmall={isSmallSideNav}
				/>
			) : null}

			<AddNewList userId={user.userId} isSmall={isSmallSideNav} />
		</Container>
	);
};

export default UserNavigation;
