import React from 'react';
import styled from 'styled-components';

interface Props {
	todoTitle: string;
	isChecked: boolean;
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
		opacity: ${({ isChecked }) => (isChecked ? '0' : '1')};
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
const TodoTitle = styled.p`
	margin: 0;
	color: ${({ theme }) => theme.colors.darkText};
	word-break: break-all;
`;

const Task: React.FC<Props> = ({ todoTitle, isChecked }) => {
	return (
		<Container>
			<CheckboxContainer>
				<StyledCheckbox isChecked={isChecked} />
			</CheckboxContainer>
			<TitleContainer>
				<TodoTitle>{todoTitle}</TodoTitle>
			</TitleContainer>
		</Container>
	);
};

export default Task;
