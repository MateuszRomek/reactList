import React from 'react';
import styled from 'styled-components';

interface Props {
	listName: string;
	ListIcon: React.FC;
}

const ListContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	padding: 0.6rem 1.5rem;

	color: ${({ theme }) => theme.colors.darkText};
	&:hover {
		background-color: ${({ theme }) => theme.colors.hoverListLight};
		cursor: pointer;
	}
`;

const IconContainer = styled.div`
	width: 16px;
	height: 16px;
	margin-right: 1.2rem;
	& svg {
		width: 100%;
		height: 100%;
	}
`;

const NameContainer = styled.div`
	font-size: 1.6rem;
`;

const List: React.FC<Props> = ({ ListIcon, listName }) => {
	return (
		<ListContainer>
			<IconContainer>
				<ListIcon />
			</IconContainer>
			<NameContainer>{listName}</NameContainer>
		</ListContainer>
	);
};

export default List;
