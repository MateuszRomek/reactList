import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as SignOut } from '../../../assets/svg/signOut.svg';
import { useHistory } from 'react-router';
import { signOutUser } from '../../../redux/ducks/user';
const Btn = styled.button`
	border: none;
	background-color: inherit;
	transition: background 0.3s ease;
	padding: 0.9rem 1.6rem;
	align-self: flex-start;
	margin-top: auto;

	&:hover {
		background-color: ${({ theme }) => theme.colors.hoverListLight};
		cursor: pointer;
	}
`;
interface Props {}
const LogoutButton: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	return (
		<Btn
			onClick={() => {
				history.push('/login');
				dispatch(signOutUser());
				localStorage.removeItem('token');
			}}
		>
			<SignOut
				style={{ height: '1.8rem', width: '1.8rem', color: 'rgb(23, 37, 42)' }}
			/>
		</Btn>
	);
};

export default LogoutButton;
