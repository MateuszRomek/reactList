import React, { createRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as PlusIcon } from '../../../assets/svg/plusSolid.svg';
import { toggleSideNavigation } from '../../../redux/ducks/ui';
import { SvgContainer } from '../../Shared/SvgContainer';

interface Props {
	isSmall: boolean;
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

const AddContainer = styled.div<BackgroudProps & StyledProps>`
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

const AddNewList: React.FC<Props> = ({ isSmall }) => {
	const [isInputFocused, setInputFocused] = useState(false);
	const inputRef = createRef<HTMLInputElement>();
	const dispatch = useDispatch();
	const handleButtonClick = () => {
		if (inputRef.current?.value) {
			//TODO POST TO SERVER WITH NEW LIST DATA
		} else {
			if (isSmall) {
				dispatch(toggleSideNavigation());
				inputRef.current?.focus();
			} else {
				inputRef.current?.focus();
			}
		}
	};
	return (
		<AddContainer isSmall={isSmall} isInputFocused={isInputFocused}>
			<AddButton onClick={handleButtonClick}>
				<SvgContainer>
					<PlusIcon />
				</SvgContainer>
			</AddButton>

			{!isSmall ? (
				<AddInput
					onClick={handleButtonClick}
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
