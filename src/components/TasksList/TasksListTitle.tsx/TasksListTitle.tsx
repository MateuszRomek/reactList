import React, { createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { changeListName, updateListName } from '../../../redux/ducks/lists';
import { IlistsReducer } from '../../../redux/types/listsTypes';

interface StyledProps {
	visible: boolean;
}

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
	margin-left: 1.5rem;
	padding: 0.5rem 0.7rem;
	transition: background-color 0.2s;
	flex: 1;
`;
const TitleHeader = styled.span<StyledProps>`
	margin: 0;
	font-size: 2.3rem;
	font-weight: 600;
	padding: 0.5rem;
	position: ${({ visible }) => (visible ? 'static' : 'absolute')};
	visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};

	&:hover {
		background-color: ${({ theme }) => theme.colors.selectedListLight};
		cursor: pointer;
	}
`;

const TitleInput = styled.input<StyledProps>`
	margin: 0;
	font-size: 2.3rem;
	font-weight: 600;
	padding: 0.3rem 0.8rem;
	width: auto;
	max-width: 99%;
	position: ${({ visible }) => (visible ? 'static' : 'absolute')};
	opacity: ${({ visible }) => (visible ? '1' : '0')};
`;
const TasksListTitle: React.FC = () => {
	const selectedList = useSelector(
		(state: IlistsReducer) => state.lists.currentList
	);
	const [isInputVisible, setInputVisible] = useState(false);
	const dispatch = useDispatch();
	const inputRef = createRef<HTMLInputElement>();
	const handleTitleClick = () => {
		setInputVisible(true);
		inputRef.current?.focus();
	};
	const handleInputBlur = () => {
		setInputVisible(false);
		const value = inputRef.current?.value;
		dispatch(updateListName(value));
		inputRef.current?.blur();
	};
	return (
		<TitleContainer>
			{selectedList.isDefaultList ? null : (
				<EmojiContainer>
					<EmojiSpan aria-label="emoji" role="img">
						{selectedList.emoji}
					</EmojiSpan>
				</EmojiContainer>
			)}
			<TitleTextContainer>
				{selectedList.isDefaultList ? (
					<TitleHeader visible={true}>{selectedList.name}</TitleHeader>
				) : (
					<>
						<TitleHeader onClick={handleTitleClick} visible={!isInputVisible}>
							{selectedList.name}
						</TitleHeader>
						<TitleInput
							onChange={(e) => dispatch(changeListName(e.target.value))}
							ref={inputRef}
							onBlur={handleInputBlur}
							visible={isInputVisible}
							value={selectedList.name}
							type="text"
						/>
					</>
				)}
			</TitleTextContainer>
		</TitleContainer>
	);
};

export default TasksListTitle;
