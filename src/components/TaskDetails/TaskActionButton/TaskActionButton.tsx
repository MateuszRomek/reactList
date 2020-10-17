import React, { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
	ServerTodoLogActions,
	TodoActionTypes,
} from '../../../redux/types/todoTypes';

interface Props {
	Icon: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & {
			title?: string | undefined;
		}
	>;
	reduxAction?: () => {
		type: string;
	};
	color?: string;
}
const Button = styled.button`
	padding: 1rem;
	border: none;
	display: grid;
	place-items: center;
	background-color: inherit;
	transition: background 0.2s ease;
	& svg {
		height: 2rem;
		width: 2rem;
	}
	&:hover {
		cursor: pointer;
		background-color: white;
	}
`;

const TaskActionButton: React.FC<Props> = ({ Icon, reduxAction, color }) => {
	const dispatch = useDispatch();
	const handleBtnClick = () => {
		reduxAction && dispatch(reduxAction());
	};
	return (
		<Button onClick={handleBtnClick}>
			<Icon
				style={{
					height: '1.6rem',
					width: '1.6rem',
					color: color ? color : 'black',
				}}
			/>
		</Button>
	);
};

export default TaskActionButton;
