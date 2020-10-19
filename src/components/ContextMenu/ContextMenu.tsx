import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as BinIcon } from '../../assets/svg/trash.svg';
import { handlePostDeleteTodo } from '../../redux/ducks/todo';
interface Props {
	contextMenuPosition: {
		x: number;
		y: number;
	};
	setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
	showContextMenu: boolean;
	contextTodoId: string;
}
interface StyledProps {
	x: number;
	y: number;
}
interface StyledIsVisible {
	isVisible: boolean;
}
const Backdrop = styled.div<StyledIsVisible>`
	display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9999;
`;
const BackdropInner = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;
const Menu = styled.div<StyledProps>`
	position: absolute;
	top: ${({ y }) => `${y}px`};
	left: ${({ x }) => `${x}px`};
	width: 18rem;
	background-color: white;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.1);
	border: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
`;
const MenuItem = styled.div`
	padding: 1rem 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		cursor: pointer;
	}
`;

const MenuItemText = styled.span`
	font-size: 1.5rem;
	margin-left: 1.2rem;
	color: ${({ theme }) => theme.colors.red};
`;
const ContextMenu: React.FC<Props> = ({
	contextMenuPosition: { x, y },
	setShowContextMenu,
	showContextMenu,
	contextTodoId,
}) => {
	const dispatch = useDispatch();
	const handleBackdropClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const targetClassName = (e.target as Element).className;
		if (
			typeof targetClassName === 'string' &&
			targetClassName.includes('contextBackdrop')
		) {
			setShowContextMenu(false);
		}
	};

	const handleItemClick = () => {
		dispatch(handlePostDeleteTodo(contextTodoId));
		setShowContextMenu(false);
	};
	return (
		<Backdrop onClick={handleBackdropClick} isVisible={showContextMenu}>
			<BackdropInner className="contextBackdrop">
				<Menu x={x} y={y}>
					<MenuItem onClick={handleItemClick}>
						<BinIcon
							style={{
								height: '1.4rem',
								width: '1.4rem',
								color: 'rgb(195, 52, 52)',
							}}
						/>
						<MenuItemText>Delete this todo</MenuItemText>
					</MenuItem>
				</Menu>
			</BackdropInner>
		</Backdrop>
	);
};

export default ContextMenu;
