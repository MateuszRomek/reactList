import React from 'react';
import styled from 'styled-components';
import UserNavigation from '../../components/UserNavigation/UserNavigation';
const RootGrid = styled.div`
	display: grid;
	grid-template-columns: 260px 1fr 400px;
	height: 100vh;
	overflow: hidden;
`;

const LeftContainer = styled.div`
	border-right: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	background-color: ${({ theme }) => theme.colors.lightGray};
`;

const RootViewTemplate: React.FC = () => {
	return (
		<RootGrid>
			<LeftContainer>
				<UserNavigation />
			</LeftContainer>
		</RootGrid>
	);
};

export default RootViewTemplate;
