import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as DeadlineIcon } from '../../../assets/svg/deadline.svg';
import CalendarPicker from '../../UI/CalendarPicker/CalendarPicker';
interface Props {
	todoId: string;
	todoDeadline: string;
	currentListId: string;
}
const Container = styled.div`
	width: 100%;
	margin-top: 2rem;
	background-color: white;
	border: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	padding: 1rem 1.2rem;
	display: flex;
	align-items: center;
`;

const Text = styled.span`
	color: ${({ theme }) => theme.colors.darkText};
	font-size: 1.5rem;
	margin-left: 1.5rem;
	&:hover {
		cursor: pointer;
	}
`;
interface TopLeftObj {
	top: number;
	left: number;
}
const TaskDeadline: React.FC<Props> = ({
	todoDeadline,
	todoId,
	currentListId,
}) => {
	const [isDateOpen, setDateOpen] = useState(false);
	const [elementPosition, setElementPosition] = useState<TopLeftObj>({
		top: 0,
		left: 0,
	});
	const handleBackdropClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const targetDataAttr = (e.target as Element).getAttribute('data-calendar');
		if (targetDataAttr === 'backdrop') {
			setDateOpen(false);
		}
		return;
	};
	return (
		<Container>
			{isDateOpen && (
				<CalendarPicker
					currentListId={currentListId}
					todoId={todoId}
					elementPosition={elementPosition}
					handleBackdrop={handleBackdropClick}
				/>
			)}
			<DeadlineIcon
				style={{ width: '16px', height: '16px', color: 'rgb(23, 37, 42)' }}
			/>
			<Text
				onClick={(e) => {
					const targetCoords = (e.target as Element).getBoundingClientRect();
					const isSmallScreen = window.innerWidth < 950;
					const correctY = (targetCoords.y += 40);
					const correctX = isSmallScreen
						? (targetCoords.x -= 120)
						: (targetCoords.x -= 70);
					setElementPosition({ top: correctY, left: correctX });
					setDateOpen(true);
				}}
			>
				{todoDeadline !== '' ? todoDeadline : 'Add your deadline'}
			</Text>
		</Container>
	);
};

export default TaskDeadline;
