import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectorState } from '../../../redux/globalTypes';
import styled from 'styled-components';
import { toggleModal } from '../../../redux/ducks/ui';
import { CSSTransition } from 'react-transition-group';

interface ShowProps {
	show: boolean;
}
const ModalContainer = styled.div<ShowProps>`
	opacity: ${(props) => (props.show ? '1' : '0')};
	pointer-events: ${(props) => (props.show ? 'all' : 'none')};
	position: absolute;
	width: 450px;
	height: 250px;
	background-color: white;
	top: 10%;
	left: 50%;
	border-radius: 8px;
	padding: 1.5rem 2rem;
	transform: translate(-50%, 0);
	display: flex;
	flex-direction: column;

	@media (max-width: 800px) {
		width: 350px;
		height: 220px;
	}
`;
const Backdrop = styled.div<ShowProps>`
	opacity: ${(props) => (props.show ? '1' : '0')};
	pointer-events: ${(props) => (props.show ? 'all' : 'none')};
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.4);
`;
const ModalHeader = styled.h1`
	margin: 1rem 0;
	font-size: 2.4rem;
	color: ${({ theme }) => theme.colors.darkText};
`;

const ModalContent = styled.p`
	margin: 1rem 0;
	font-size: 1.8rem;
	color: ${({ theme }) => theme.colors.darkText};
`;
const ModalButton = styled.button`
	padding: 0.6rem 1.5rem;
	color: white;
	font-weight: bold;
	font-size: 1.6rem;
	background-color: ${({ theme }) => theme.colors.deepSea};
	display: block;
	border: none;
	border-radius: 8px;
	margin-top: auto;
	margin-left: auto;
	width: 9rem;
`;
const ReactModal: React.FC = () => {
	const modalRef = useRef<null | HTMLDivElement>(null);
	const modalState = useSelector((state: SelectorState) => state.ui.modal);
	const dispatch = useDispatch();
	return (
		<Backdrop onClick={() => dispatch(toggleModal())} show={modalState.isOpen}>
			<CSSTransition
				nodeRef={modalRef}
				in={modalState.isOpen}
				timeout={300}
				classNames="modal"
				unmountOnExit
			>
				<ModalContainer ref={modalRef} show={modalState.isOpen}>
					<ModalHeader>{modalState.message.title}</ModalHeader>
					<ModalContent>{modalState.message.content}</ModalContent>
					<ModalButton
						onClick={(e) => {
							e.stopPropagation();
							dispatch(toggleModal());
						}}
					>
						Close
					</ModalButton>
				</ModalContainer>
			</CSSTransition>
		</Backdrop>
	);
};

export default ReactModal;
