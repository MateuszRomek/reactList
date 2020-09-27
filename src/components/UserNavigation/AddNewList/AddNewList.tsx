import React, { createRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PlusIcon from '../../../assets/svg/plusSolid.svg';
import { postNewList } from '../../../redux/ducks/lists';
import { toggleSideNavigation } from '../../../redux/ducks/ui';
import { SvgImage } from '../../Shared/SvgContainer';

interface Props {
	isSmall: boolean;
	userId: string;
}

interface BackgroudProps {
	isInputFocused: boolean;
}
interface StyledProps {
	isSmall: boolean;
}

const AddInput = styled.input`
	display: block;
	padding: 0.5rem 0.9rem 0.5rem 0;
	color: ${({ theme }) => theme.colors.darkText};
	border: none;
	background-color: inherit;
	font-size: 1.4rem;
	margin-left: 1.2rem;
	&::placeholder {
		color: inherit;
	}
	&:active {
		border: none;
		outline: none;
	}
	&:focus {
		border: none;
		outline: none;
	}
`;

const AddContainer = styled.form<BackgroudProps & StyledProps>`
	display: flex;
	width: ${({ isSmall }) => (isSmall ? '5rem' : '28rem')};
	align-items: center;
	justify-content: ${({ isSmall }) => (isSmall ? 'center' : 'flex-start')};
	padding: 0.6rem 1.5rem;
	margin: 1rem 0;
	transition: background-color 0.3s;
	background-color: ${({ isInputFocused, theme }) =>
		isInputFocused ? theme.colors.hoverListLight : 'inherit'};
`;

const AddButton = styled.button`
	border: none;
	width: 1.6rem;
	height: 1.6rem;
	background-color: inherit;
	display: block;
	padding: 0;
	&:hover {
		cursor: pointer;
	}

	&:active {
		outline: none;
	}
	&:focus {
		outline: none;
	}
`;

const AddNewList: React.FC<Props> = ({ isSmall, userId }) => {
	const [isInputFocused, setInputFocused] = useState(false);
	const [newListName, setListName] = useState('');
	const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setListName(e.target.value);
	};
	const inputRef = createRef<HTMLInputElement>();
	const dispatch = useDispatch();
	const handleSubmitButton = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (inputRef.current?.value && newListName.length > 0) {
			const token = localStorage.getItem('token');
			dispatch(postNewList(token, newListName));
			inputRef.current.value = '';
		} else {
			if (isSmall) {
				dispatch(toggleSideNavigation());
			} else {
				inputRef.current?.focus();
			}
		}
	};
	return (
		<AddContainer isSmall={isSmall} isInputFocused={isInputFocused}>
			<AddButton type="submit" onClick={(e) => handleSubmitButton(e)}>
				<SvgImage src={PlusIcon} />
			</AddButton>

			{!isSmall ? (
				<AddInput
					onChange={(e) => handleListNameChange(e)}
					type="text"
					onBlur={() => setInputFocused(false)}
					onFocus={() => setInputFocused(true)}
					ref={inputRef}
					placeholder="New list"
				/>
			) : null}
		</AddContainer>
	);
};

export default AddNewList;
