import React, { createRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useListName from '../../../hooks/useListName';
import { postUpdateListData, updateListName } from '../../../redux/ducks/lists';

import { List } from '../../../redux/types/listsTypes';
interface Props {
	setEmojiActive: React.Dispatch<React.SetStateAction<boolean>>;
	setTopPosition: React.Dispatch<React.SetStateAction<string>>;
	selectedList: List;
}
interface StyledProps {
	visible: boolean;
}

const HeightProvider = styled.div`
	height: 5rem;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 100%;
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
	font-size: 1.8rem; ;
`;
const TitleTextContainer = styled.div`
	position: relative;
	margin-left: 0.5rem;
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
	padding: 0.3rem 0.5rem;
	width: 100%;
	max-width: 99%;
	position: ${({ visible }) => (visible ? 'static' : 'absolute')};
	opacity: ${({ visible }) => (visible ? '1' : '0')};
	top: ${({ visible }) => (visible ? 'auto' : '0')};
	border: none;
	&:focus {
		outline: 1px solid ${({ theme }) => theme.colors.darkText};
	}
`;
const TasksListTitle: React.FC<Props> = ({
	setEmojiActive,
	setTopPosition,
	selectedList,
}) => {
	const [selectedListName, setSelectedListName] = useState(selectedList.name);
	const [listName, setListName] = useListName();
	const [isInputVisible, setInputVisible] = useState(false);
	const dispatch = useDispatch();
	const inputRef = createRef<HTMLInputElement>();
	const handleTitleClick = () => {
		const inputValue = inputRef.current?.value;
		setListName(inputValue);
		setInputVisible(true);
		inputRef.current?.focus();
	};

	const handleInputBlur = () => {
		setInputVisible(false);
		const value = inputRef.current?.value;
		if (value !== listName) {
			const t = localStorage.getItem('token');
			dispatch(updateListName(value));
			dispatch(postUpdateListData(t, selectedList));
		}
	};

	const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			inputRef.current?.blur();
		} else {
			return;
		}
	};
	return (
		<HeightProvider>
			<TitleContainer>
				{selectedList.isDefaultList ? null : (
					<EmojiContainer
						onClick={(e) => {
							setEmojiActive(true);
							const top = (e.clientY + 20).toString() + 'px';
							setTopPosition(top);
						}}
					>
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
								onKeyPress={(e) => handleEnterKey(e)}
								onChange={(e) => setSelectedListName(e.target.value)}
								ref={inputRef}
								onBlur={handleInputBlur}
								visible={isInputVisible}
								value={selectedListName}
								type="text"
							/>
						</>
					)}
				</TitleTextContainer>
			</TitleContainer>
		</HeightProvider>
	);
};

export default TasksListTitle;
