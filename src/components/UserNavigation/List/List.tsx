import React from 'react';
import styled from 'styled-components';
import { SvgContainer } from '../../Shared/SvgContainer';
import { Link } from 'react-router-dom';
interface Props {
	listName: string;
	ListIcon: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & {
			title?: string | undefined;
		}
	>;
	isSmallMenu: boolean;
}

interface StyledProps {
	isSmallSideNav: boolean;
}

const StyledLink = styled(Link)`
	text-decoration: none;
`;

const ListContainer = styled.div<StyledProps>`
	display: flex;
	align-items: center;
	justify-content: ${({ isSmallSideNav }) =>
		isSmallSideNav ? 'center' : 'flex-start'};
	width: ${({ isSmallSideNav }) => (isSmallSideNav ? '50px' : '280px')};
	padding: 0.9rem 1.5rem;

	color: ${({ theme }) => theme.colors.darkText};
	&:hover {
		background-color: ${({ theme }) => theme.colors.hoverListLight};
		cursor: pointer;
	}
`;

const NameContainer = styled.span`
	display: inline-block;
	font-size: 1.6rem;
	margin-left: 1.2rem;
`;

const List: React.FC<Props> = ({ ListIcon, listName, isSmallMenu }) => {
	return (
		<StyledLink to={`/todos/${listName.toLowerCase()}`}>
			<ListContainer isSmallSideNav={isSmallMenu}>
				<SvgContainer>
					<ListIcon />
				</SvgContainer>
				{!isSmallMenu ? <NameContainer>{listName}</NameContainer> : null}
			</ListContainer>
		</StyledLink>
	);
};

export default List;
