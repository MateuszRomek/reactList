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
import { fetchUserTodos } from '../../redux/ducks/todo';
import Loading from '../UI/Loading/Loading';
import LogoutButton from './LogoutButton/LogoutButton';
interface StyledProps {
	isSmallSideNav: boolean;
}
const Container = styled.div<StyledProps>`
	position: relative;
	display: flex;
	transition: all 0.2s ease;
	width: ${({ isSmallSideNav }) => (isSmallSideNav ? '50px' : '230px')};
	will-change: width;
	height: 100%;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	border-right: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	background-color: ${({ theme }) => theme.colors.lightGray};
	overflow: hidden;

	@media (max-width: 950px) {
		width: ${({ isSmallSideNav }) => (isSmallSideNav ? '50px' : '200px')};
		transition: all 0.1s;
		position: fixed;
		z-index: ${({ isSmallSideNav }) => (isSmallSideNav ? '800' : '1000')};
	}
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
	width: 50px;
	display: flex;
	align-items: center;
	padding: 1rem 0.9rem 0;
`;

const BottomBar = styled.div`
	width: 100%;
	margin-top: auto;
	border-top: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
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
		if (width < 950) {
			stableDispatch(toggleSideNavigation());
		}
	}, [stableDispatch]);

	useEffect(() => {
		stableDispatch(fetchUserLists());
		stableDispatch(fetchUserTodos());
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

			{listsState.isFetching ? (
				<Loading margin="1rem" height={30} count={1} />
			) : (
				<UserData
					isSmall={isSmallSideNav}
					userEmail={user.email}
					userName={user.name}
				/>
			)}

			{listsState.isFetching ? (
				<Loading margin="0" height={30} count={3} />
			) : (
				<UserLists
					isMarginTop={true}
					isDefaultLists={true}
					listsArray={listsState.defaultLists}
					isSmall={isSmallSideNav}
				/>
			)}
			{listsState.userLists.length > 0 ? (
				<UserLists
					isMarginTop={false}
					isDefaultLists={false}
					listsArray={listsState.userLists}
					isSmall={isSmallSideNav}
				/>
			) : null}
			{listsState.isFetching ? (
				<Loading margin="1rem" height={30} count={1} />
			) : (
				<AddNewList userId={user.userId} isSmall={isSmallSideNav} />
			)}
			<BottomBar>
				<LogoutButton />
			</BottomBar>
		</Container>
	);
};

export default UserNavigation;
