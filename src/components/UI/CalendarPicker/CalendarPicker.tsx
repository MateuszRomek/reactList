import React, { useState } from 'react';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
interface Props {
	handleBackdrop: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	elementPosition: {
		top: number;
		left: number;
	};
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

	z-index: 1000;
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
}) => {
	const [date, setDate] = useState<Date | Date[]>(new Date());
	//TODO Add redux to manage date for calendar
	return (
		<Backdrop onClick={(e) => handleBackdrop(e)}>
			<InnerRealtive data-calendar="backdrop">
				<AbsoluteCalendar top={elementPosition.top} left={elementPosition.left}>
					<Calendar
						locale="en-GB"
						onChange={(date) => {
							console.log(date.toLocaleString());
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
