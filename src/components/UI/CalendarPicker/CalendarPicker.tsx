import React, { useState } from 'react';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { useDispatch } from 'react-redux';
import { postUpdateTodo, setTodoDeadline } from '../../../redux/ducks/todo';
interface Props {
	handleBackdrop: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	elementPosition: {
		top: number;
		left: number;
	};
	todoId: string;
	currentListId: string;
}
interface StyledPorps {
	top: number;
	left: number;
}

const Backdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2000;
`;
const InnerRealtive = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

const AbsoluteCalendar = styled.div<StyledPorps>`
	position: absolute;
	top: ${({ top }) => top + 'px'};
	left: ${({ left }) => left + 'px'}; ;
`;
const CalendarPicker: React.FC<Props> = ({
	elementPosition,
	handleBackdrop,
	todoId,
	currentListId,
}) => {
	const [date, setDate] = useState<Date | Date[]>(new Date());
	const dispatch = useDispatch();
	return (
		<Backdrop onClick={(e) => handleBackdrop(e)}>
			<InnerRealtive data-calendar="backdrop">
				<AbsoluteCalendar top={elementPosition.top} left={elementPosition.left}>
					<Calendar
						locale="en-GB"
						onChange={(date) => {
							console.log(date.toLocaleString());
							const deadlineString = date.toLocaleString().split(',')[0];
							const deadlineFormat = deadlineString.replace(/\./g, '/');
							dispatch(setTodoDeadline(deadlineFormat));
							const t = localStorage.getItem('token');
							postUpdateTodo(
								t,
								todoId,
								'deadline',
								deadlineFormat,
								currentListId
							);
							setDate(date);
						}}
						value={date}
					/>
				</AbsoluteCalendar>
			</InnerRealtive>
		</Backdrop>
	);
};

export default CalendarPicker;
