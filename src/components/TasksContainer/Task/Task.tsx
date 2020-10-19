import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
	postUpdateTodo,
	setCurrentTodo,
	toggleCheckTodo,
} from '../../../redux/ducks/todo';

interface Props {
	todoTitle: string;
	isChecked: boolean;
	todoId: string;
	setContextMenuPosition: React.Dispatch<
		React.SetStateAction<{
			x: number;
			y: number;
		}>
	>;
	setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
	containerRef: React.RefObject<HTMLDivElement>;
	setContextTodoId: React.Dispatch<React.SetStateAction<string>>;
}
interface StyledProps {
	isChecked: boolean;
}

const Container = styled.div`
	margin-top: 1.5rem;
	padding: 0 1rem;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.lightGray};
	display: flex;
	align-items: center;
	&:hover {
		background-color: ${({ theme }) => theme.colors.selectedListLight};
	}
`;

const StyledCheckbox = styled.span<StyledProps>`
	display: inline-block;
	width: 1.8rem;
	height: 1.8rem;
	border: 1px solid ${({ theme }) => theme.colors.darkText};
	border-radius: 3px;
	transition: all 150ms;
	position: relative;
	background-color: ${({ theme, isChecked }) =>
		isChecked ? theme.colors.darkGray : 'inherit'};
	&:hover {
		cursor: pointer;
	}

	&::after {
		content: '✓';
		opacity: ${({ isChecked }) => (isChecked ? '1' : '0')};
		position: absolute;
		font-size: 1.3rem;
		font-weight: 700;
		top: 48%;
		left: 50%;
		color: ${({ theme, isChecked }) =>
			isChecked ? theme.colors.lightGray : theme.colors.darkGray};
		transform: translate(-48%, -50%);
	}

	&:hover::after {
		opacity: 1;
	}
`;
const CheckboxContainer = styled.div`
	padding: 0 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TitleContainer = styled.div`
	padding: 1.5rem 0;
	flex: 1;
`;
const TodoTitle = styled.p<StyledProps>`
	margin: 0;
	color: ${({ theme }) => theme.colors.darkText};
	word-break: break-all;
	text-decoration-line: ${({ isChecked }) =>
		isChecked ? 'line-through' : 'none'};
`;

const Task: React.FC<Props> = ({
	todoTitle,
	isChecked,
	todoId,
	setContextMenuPosition,
	setShowContextMenu,
	containerRef,
	setContextTodoId,
}) => {
	const dispatch = useDispatch();

	const handleTaskClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const targetClass = (e.target as Element).className;
		if (targetClass.includes('checkbox')) {
			dispatch(toggleCheckTodo(todoId));
			postUpdateTodo(todoId, 'isChecked', '');
		} else {
			dispatch(setCurrentTodo(todoId));
		}
	};

	const handleContextMenu = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		e.preventDefault();
		setContextTodoId(todoId);
		const containerWidth = (containerRef.current as Element).scrollWidth - 150;
		const yPosition = e.clientY + 10;
		if (e.clientX > containerWidth) {
			const xPosition = e.clientX - 160;
			setContextMenuPosition({ x: xPosition, y: yPosition });
			setShowContextMenu(true);
		} else {
			setContextMenuPosition({ x: e.clientX + 10, y: yPosition });
			setShowContextMenu(true);
		}
	};
	return (
		<Container onClick={(e) => handleTaskClick(e)}>
			<CheckboxContainer>
				<StyledCheckbox className="checkbox" isChecked={isChecked} />
			</CheckboxContainer>
			<TitleContainer onContextMenu={(e) => handleContextMenu(e)}>
				<TodoTitle isChecked={isChecked}>{todoTitle}</TodoTitle>
			</TitleContainer>
		</Container>
	);
};

export default Task;
