import React, { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import usePreviousName from '../../../hooks/usePreviousName';
import {
	deleteList,
	postDeleteList,
	postUpdateListData,
	updateListName,
} from '../../../redux/ducks/lists';
import { ReactComponent as DotsIcon } from '../../../assets/svg/dots.svg';
import { ReactComponent as BinIcon } from '../../../assets/svg/trash.svg';
import { List } from '../../../redux/types/listsTypes';
import { resetCurrentTodo } from '../../../redux/ducks/todo';
interface Props {
	setEmojiActive: React.Dispatch<React.SetStateAction<boolean>>;
	setTopPosition: React.Dispatch<React.SetStateAction<string>>;
	selectedList: List;
}
interface StyledProps {
	visible: boolean;
}

const HeightProvider = styled.div`
	min-height: 5rem;
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
	&:hover {
		cursor: ${({ visible }) => (visible ? 'text' : 'default')};
	}
`;

const ListOptionsDropdown = styled.div`
	position: relative;
	background-color: white;
	display: block;
	margin-left: auto;
`;
const ListOptionsButton = styled.button`
	margin: 0;
	padding: 1rem;
	display: grid;
	place-items: center;
	border: none;
	outline: none;
	background-color: white;
	transition: background-color 0.2s ease-in-out;
	&:hover {
		cursor: pointer;
		background-color: ${({ theme }) => theme.colors.selectedListLight};
	}
`;

const ListOptionsMenu = styled.div<StyledProps>`
	position: absolute;
	display: ${({ visible }) => (visible ? 'block' : 'none')};
	width: 15rem;
	top: 100%;
	left: -11rem;
	background-color: white;
	border-left: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	border-right: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
`;
const ListOptionsItem = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	border-top: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	padding: 1rem 0.5rem;
	&:hover {
		cursor: pointer;
		background-color: ${({ theme }) => theme.colors.selectedListLight};
	}
`;
const ListOptionsText = styled.span`
	margin-left: 1rem;
	color: ${({ theme }) => theme.colors.red};
	font-size: 1.4rem;
`;

const TasksListTitle: React.FC<Props> = ({
	setEmojiActive,
	setTopPosition,
	selectedList,
}) => {
	const [selectedListName, setSelectedListName] = useState(selectedList.name);
	const [listName, setListName] = usePreviousName();
	const [isInputVisible, setInputVisible] = useState(false);
	const [isOptionsClicked, setOptionsClicked] = useState(false);
	const dispatch = useDispatch();
	const inputRef = createRef<HTMLInputElement>();
	const handleTitleClick = () => {
		const inputValue = inputRef.current?.value;
		setListName(inputValue);
		setInputVisible(true);
		inputRef.current?.focus();
	};
	useEffect(() => {
		setSelectedListName(selectedList.name);
	}, [selectedList.name]);

	const handleInputBlur = () => {
		setInputVisible(false);
		const value = inputRef.current?.value;
		if (value !== listName) {
			dispatch(updateListName(value));
			dispatch(postUpdateListData(selectedList));
		}
	};

	const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			inputRef.current?.blur();
		} else {
			return;
		}
	};

	const handleListDelete = () => {
		dispatch(resetCurrentTodo());
		dispatch(postDeleteList(selectedList._id));
		dispatch(deleteList(selectedList._id));
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
				{!selectedList.isDefaultList && (
					<ListOptionsDropdown>
						<ListOptionsButton
							onClick={() => setOptionsClicked(!isOptionsClicked)}
						>
							<DotsIcon style={{ height: '1.6rem', width: '1.6rem' }} />{' '}
						</ListOptionsButton>
						<ListOptionsMenu visible={isOptionsClicked}>
							<ListOptionsItem onClick={handleListDelete}>
								<BinIcon
									style={{
										height: '1.4rem',
										width: '1.4rem',
										color: 'rgb(195, 52, 52)',
									}}
								/>
								<ListOptionsText>Delete this list</ListOptionsText>
							</ListOptionsItem>
						</ListOptionsMenu>
					</ListOptionsDropdown>
				)}
			</TitleContainer>
		</HeightProvider>
	);
};

export default TasksListTitle;
