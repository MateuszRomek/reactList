import React from 'react';
import styled from 'styled-components';

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 4.5rem;
`;

const EmojiContainer = styled.div`
	padding: 0.4rem;
	transition: background-color 0.2s;
	&:hover {
		background-color: ${({ theme }) => theme.colors.selectedListLight};
		cursor: pointer;
	}
`;

const EmojiSpan = styled.span`
	display: grid;
	place-items: center;
	font-size: 2rem; ;
`;
const TitleTextContainer = styled.div`
	position: relative;
	margin-left: 2rem;
	padding: 0.5rem 0.7rem;
	transition: background-color 0.2s;
	flex: 1;
	&:hover {
		background-color: ${({ theme }) => theme.colors.selectedListLight};
		cursor: pointer;
	}
`;
const TitleHeader = styled.span`
	margin: 0;
	font-size: 2.3rem;
	font-weight: 600;
`;

const TitleInput = styled.input`
	margin: 0;
	font-size: 2.3rem;
	font-weight: 600;
	padding: 0.3rem 0.8rem;
	width: auto;
	max-width: 99%;
`;
const TasksListTitle: React.FC = () => {
	return (
		<TitleContainer>
			<EmojiContainer>
				<EmojiSpan aria-label="emoji" role="img">
					😎
				</EmojiSpan>
			</EmojiContainer>
			<TitleTextContainer>
				{/* <TitleHeader>My Day</TitleHeader>
				<TitleInput type="text" /> */}
			</TitleTextContainer>
		</TitleContainer>
	);
};

export default TasksListTitle;
