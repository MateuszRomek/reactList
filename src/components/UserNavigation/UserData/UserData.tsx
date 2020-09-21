import React from 'react';
import styled from 'styled-components';

interface Props {
	userName: string;
	userEmail: string;
}

const Container = styled.div`
	color: ${({ theme }) => theme.colors.darkText};
	width: 100%;
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

const UserData: React.FC<Props> = ({ userEmail, userName }) => {
	return (
		<Container>
			<UserName>{userName}</UserName>
			<UserEmail>{userEmail}</UserEmail>
		</Container>
	);
};

export default UserData;
