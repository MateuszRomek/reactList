import React, { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import usePreviousName from '../../../hooks/usePreviousName';
import { postUpdateTodo, changeTodoname } from '../../../redux/ducks/todo';
import adjustElementHeight from '../../../utils/adjustElementHeight';

interface Props {
	taskTitle: string;
	todoId: string;
}
interface StyledProps {
	isVisible: boolean;
}

const TaskTitleContainer = styled.div`
	border: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	padding: 1rem;
	display: flex;
	align-items: center;
	background-color: white;
	overflow: hidden;
	position: relative;
`;
const Title = styled.h2<StyledProps>`
	margin: 0;
	font-size: 1.6rem;
	width: 100%;
	padding: 0.6rem;
	position: ${({ isVisible }) => (isVisible ? 'static' : 'absolute')};
	opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
	top: ${({ isVisible }) => (isVisible ? 'auto' : '0')};
	z-index: ${({ isVisible }) => (isVisible ? '100' : '10')};
`;
const TextArea = styled.textarea<StyledProps>`
	font-size: 1.6rem;
	font-family: inherit;
	resize: none;
	height: 3.1rem;
	font-weight: 600;
	padding: 0.6rem;
	width: 100%;
	position: ${({ isVisible }) => (isVisible ? 'static' : 'absolute')};
	opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
	z-index: ${({ isVisible }) => (isVisible ? '100' : '10')};
	overflow: hidden;
	&:focus {
		border: none;
		outline: 1px solid ${({ theme }) => theme.colors.darkGray};
	}
`;
const TaskTitle: React.FC<Props> = ({ taskTitle, todoId }) => {
	const [previousName, setPreviousName] = usePreviousName();
	const [isTextAreaVisible, setTextArea] = useState(false);
	const [localTaskTitle, setLocalTaskTitle] = useState(taskTitle);
	const textAreaRef = createRef<HTMLTextAreaElement>();
	const dispatch = useDispatch();
	useEffect(() => {
		setLocalTaskTitle(taskTitle);
	}, [taskTitle]);
	const handleTitleClick = () => {
		setPreviousName(taskTitle);
		setTextArea(true);
		textAreaRef.current?.focus();
	};
	const handleTextAreaBlur = () => {
		setTextArea(false);
		if (previousName !== localTaskTitle) {
			const t = localStorage.getItem('token');
			dispatch(changeTodoname(localTaskTitle));
			postUpdateTodo(t, todoId, 'title', localTaskTitle);
		}
	};

	return (
		<TaskTitleContainer>
			<Title onClick={handleTitleClick} isVisible={!isTextAreaVisible}>
				{taskTitle}
			</Title>
			<TextArea
				onKeyDown={(e) => adjustElementHeight<HTMLTextAreaElement>(e)}
				onKeyUp={(e) => adjustElementHeight<HTMLTextAreaElement>(e)}
				ref={textAreaRef}
				isVisible={isTextAreaVisible}
				onBlur={() => handleTextAreaBlur()}
				value={localTaskTitle}
				maxLength={253}
				onChange={(e) => setLocalTaskTitle(e.target.value)}
			/>
		</TaskTitleContainer>
	);
};

export default TaskTitle;
