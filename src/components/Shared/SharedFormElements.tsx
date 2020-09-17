import styled from 'styled-components';

export const FormElementContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const FormLabel = styled.label`
	font-size: 1.6rem;
	font-weight: 700;
	margin: 0.6rem 0;
	color: ${({ theme }) => theme.colors.darkText};
`;

export const FormInput = styled.input`
	background-color: ${({ theme }) => theme.colors.lightBlue};
	padding: 0.7rem 1rem;
	color: ${({ theme }) => theme.colors.darkText};
	border: none;
	border-radius: 7px;
	width: 30rem;
`;

export const FormButton = styled.button`
	margin: 1.5rem 0;
	border: none;
	border-radius: 6px;
	color: white;
	font-weight: 500;
	font-size: 1.4rem;
	display: grid;
	place-items: center;
	padding: 0.6rem 1.4rem;
	background-color: ${({ theme }) => theme.colors.deepSea};
`;

export const ErrorMessage = styled.p`
	color: red;
	padding: 0 0.8rem;
	font-size: 1.2rem;
	font-weight: 400;
	margin: 0.8rem 0;
	width: 250px;
	word-break: break-word;
`;
