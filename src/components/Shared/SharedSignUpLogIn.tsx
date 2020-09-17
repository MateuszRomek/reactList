import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FlexContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	flex-direction: column;

	height: 39rem;
`;

export const StyledSvg = styled.span`
	display: inline-block;
	width: 1.6rem;
	height: 1.6rem;
	margin-left: 0.5rem;
	margin-right: 0.5rem;
	& svg {
		color: ${({ theme }) => theme.colors.deepSea};
		width: 100%;
		height: 100%;
	}
`;

export const ElementTitle = styled.h2`
	color: ${({ theme }) => theme.colors.darkText};
	margin: 1.5rem 0;
	font-size: 5.4rem;
`;

export const StyledLink = styled(Link)`
	text-decoration: none;
	color: ${({ theme }) => theme.colors.deepSea};
	transition: transform 0.2s ease-in-out;
	font-weight: 700;
	font-size: 1.6rem;
	display: flex;
	align-items: center;
	margin-top: 2.5rem;
	&:hover {
		transform: scale(1.1);
	}
`;
