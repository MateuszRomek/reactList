import React, { createRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useListName from '../../../hooks/useListName';
import { updateTodoname } from '../../../redux/ducks/todo';

interface Props {
	taskTitle: string;
}
interface StyledProps {
	isVisible: boolean;
}

const TaskTitleContainer = styled.div`
	border: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	padding: 1rem;
	background-color: white;
	overflow: hidden;
	position: relative;
`;
const Title = styled.h2<StyledProps>`
	margin: 0;
	font-size: 1.6rem;
	position: ${({ isVisible }) => (isVisible ? 'static' : 'absolute')};
	opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
	top: ${({ isVisible }) => (isVisible ? 'auto' : '0')};
`;
const TextArea = styled.textarea<StyledProps>`
	font-size: 2.2rem;
	height: 35px;
	resize: none;
	font-weight: 600;
	padding: 0.6rem;
	width: 100%;
	position: ${({ isVisible }) => (isVisible ? 'static' : 'absolute')};
	opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
	overflow: hidden;
`;
const TaskTitle: React.FC<Props> = ({ taskTitle }) => {
	const [listName, setListName] = useListName();
	const [isTextAreaVisible, setTextArea] = useState(false);
	const [localTaskTitle, setLocalTaskTitle] = useState(taskTitle);
	const textAreaRef = createRef<HTMLTextAreaElement>();
	const dispatch = useDispatch();
	const handleTitleClick = () => {
		setListName(taskTitle);
		setTextArea(true);
		textAreaRef.current?.focus();
	};
	const handleTextAreaBlur = () => {
		if (listName !== localTaskTitle) {
			setTextArea(false);
			const t = localStorage.getItem('token');
			dispatch(updateTodoname(localTaskTitle));
		}
	};
	const adjustAreaHeight = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const areaElement = e.target as HTMLElement;
		areaElement.style.height =
			areaElement.scrollHeight > areaElement.clientHeight
				? areaElement.scrollHeight + 'px'
				: '35px';
	};
	return (
		<TaskTitleContainer>
			<Title onClick={handleTitleClick} isVisible={!isTextAreaVisible}>
				{taskTitle}
			</Title>
			<TextArea
				onKeyDown={(e) => adjustAreaHeight(e)}
				ref={textAreaRef}
				isVisible={isTextAreaVisible}
				onBlur={handleTextAreaBlur}
				value={localTaskTitle}
				maxLength={253}
				onChange={(e) => setLocalTaskTitle(e.target.value)}
			/>
		</TaskTitleContainer>
	);
};

export default TaskTitle;
