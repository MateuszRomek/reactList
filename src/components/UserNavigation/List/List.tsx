import React from 'react';
import styled from 'styled-components';
import { SvgImage } from '../../Shared/SvgContainer';
import { Link } from 'react-router-dom';
import { apppendDots } from '../../../utils/appendDots';
import { useDispatch } from 'react-redux';
import { setCurrentList, updateList } from '../../../redux/ducks/lists';
interface Props {
	listName: string;
	listIcon?: string;
	listEmoji?: string;
	isSmallMenu: boolean;
	listId: string;
}

interface StyledProps {
	isSmallSideNav: boolean;
}

const StyledLink = styled(Link)`
	text-decoration: none;
	width: 100%;
`;

const ListContainer = styled.div<StyledProps>`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 230px;
	padding: 0.9rem 1.65rem;
	
	color: ${({ theme }) => theme.colors.darkText};
	&:hover {
		background-color: ${({ theme }) => theme.colors.hoverListLight};
		cursor: pointer;
	}
`;

const NameContainer = styled.span`
	display: inline-block;
	font-size: 1.6rem;
	margin-left: 1.65rem;
`;

const EmojiSpan = styled.span`
	display: block;
	font-size: 1.3rem;
`;

const List: React.FC<Props> = ({
	listEmoji,
	listIcon,
	listName,
	isSmallMenu,
	listId,
}) => {
	const dispatch = useDispatch();

	const handleListClick = (id: string) => {
		dispatch(updateList());
		dispatch(setCurrentList(id));
	};

	return (
		<StyledLink
			onClick={() => handleListClick(listId)}
			to={`/todos/${listName.toLowerCase()}`}
		>
			<ListContainer isSmallSideNav={isSmallMenu}>
				{listEmoji ? (
					<EmojiSpan>{listEmoji}</EmojiSpan>
				) : (
					<SvgImage src={listIcon} />
				)}				
					<NameContainer>
						{listName.length > 19 ? apppendDots(19, listName) : listName}
					</NameContainer>
			</ListContainer>
		</StyledLink>
	);
};

export default List;
