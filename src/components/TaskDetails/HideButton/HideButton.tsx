import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as RightChevon } from '../../../assets/svg/chevron.svg';
import { resetCurrentTodo } from '../../../redux/ducks/todo';

const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 20;
	padding: 1rem 1rem 1.5rem 1rem;
	background-color: ${({ theme }) => theme.colors.lightGray};
	border-top: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
`;
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

const HideButton: React.FC = () => {
	const dispatch = useDispatch();

	return (
		<Container>
			<Button onClick={() => dispatch(resetCurrentTodo())}>
				<RightChevon />
			</Button>
		</Container>
	);
};

export default HideButton;
