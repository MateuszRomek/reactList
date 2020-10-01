import React, { createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useListName from '../../../hooks/useListName';
import {
	changeListName,
	postUpdateListData,
	updateListName,
} from '../../../redux/ducks/lists';
import { IlistsReducer } from '../../../redux/types/listsTypes';

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
	width: auto;
	max-width: 99%;
	position: ${({ visible }) => (visible ? 'static' : 'absolute')};
	opacity: ${({ visible }) => (visible ? '1' : '0')};
	top: ${({ visible }) => (visible ? 'auto' : '0')};
	border: none;
	&:focus {
		outline: 1px solid ${({ theme }) => theme.colors.darkText};
	}
`;
const TasksListTitle: React.FC = () => {
	const selectedList = useSelector(
		(state: IlistsReducer) => state.lists.currentList
	);
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
		const { _id, name } = selectedList;
		if (value !== listName) {
			const t = localStorage.getItem('token');
			dispatch(updateListName(value));
			dispatch(postUpdateListData(t, _id, name, 'name'));
		}
		inputRef.current?.blur();
	};
	return (
		<HeightProvider>
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
		</HeightProvider>
	);
};

export default TasksListTitle;
