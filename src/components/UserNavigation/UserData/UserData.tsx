import React from 'react';
import styled from 'styled-components';

interface Props {
	userName: string;
	userEmail: string;
	isSmall: boolean;
}

interface StyledProps {
	isSmall: boolean;
}

const Container = styled.div<StyledProps>`
	opacity: ${({ isSmall }) => (isSmall ? '0' : '1')};
	position: ${({ isSmall }) => (isSmall ? 'absolute' : 'static')};
	pointer-events: ${({ isSmall }) => (isSmall ? 'none' : 'all')};
	color: ${({ theme }) => theme.colors.darkText};
	width: 280px;
	word-break: break-all;
	padding: 0 1.5rem;
	margin: 1rem 0;
`;
const UserName = styled.p`
	font-size: 1.5rem;
	margin: 0.5rem 0;
	font-weight: 700;
`;
const UserEmail = styled.p`
	font-size: 1.2rem;
	margin: 0.5rem 0;
	font-weight: 500;
`;

const UserData: React.FC<Props> = ({ userEmail, userName, isSmall }) => {
	return (
		<Container isSmall={isSmall}>
			<UserName>{userName}</UserName>
			<UserEmail>{userEmail}</UserEmail>
		</Container>
	);
};

export default UserData;
