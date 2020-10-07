import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as PlusIcon } from '../../../assets/svg/plusSolid.svg';
import { postNewTodo } from '../../../redux/ducks/todo';
interface Props {
	listId: string;
}
const AddNewTaskForm = styled.form`
	margin-top: auto;
	width: 100%;
	border-radius: 8px;
	display: flex;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.lightGray};
	padding: 1rem 1.5rem;

	transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	&:hover {
		background-color: ${({ theme }) => theme.colors.borderGrayColor};
	}
`;
const AddButton = styled.button`
	border: none;
	background-color: inherit;
	padding: 0.5rem 1rem;
	& svg {
		width: 18px;
		height: 18px;
	}
`;

const AddInput = styled.input`
	width: 100%;
	background-color: inherit;
	border: none;
	position: relative;
	padding: 1rem;
	font-size: 1.6rem;
	color: ${({ theme }) => theme.colors.darkText};

	&:focus,
	&:active {
		outline: none;
	}
`;

const AddNewTask: React.FC<Props> = ({ listId }) => {
	const dispatch = useDispatch();
	const [todoTitle, setTodoTitle] = useState('');
	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const t = localStorage.getItem('token');
		dispatch(postNewTodo(t, todoTitle, listId));
		setTodoTitle('');
	};
	return (
		<AddNewTaskForm onSubmit={(e) => handleFormSubmit(e)}>
			<AddButton type="submit">
				<PlusIcon />
			</AddButton>
			<AddInput
				value={todoTitle}
				onChange={(e) => setTodoTitle(e.target.value)}
				maxLength={240}
				type="text"
			/>
		</AddNewTaskForm>
	);
};

export default AddNewTask;
