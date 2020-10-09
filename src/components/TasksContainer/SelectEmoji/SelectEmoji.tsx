import React from 'react';
import styled from 'styled-components';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useDispatch } from 'react-redux';
import {
	postUpdateListData,
	updateListEmoji,
} from '../../../redux/ducks/lists';
import { List } from '../../../redux/types/listsTypes';

interface Props {
	isEmojiActive: boolean;
	top: string;
	setEmojiActive: React.Dispatch<React.SetStateAction<boolean>>;
	selectedList: List;
}
interface StyledProps {
	isActive: boolean;
	top?: string;
}

const EmojiContainer = styled.div<StyledProps>`
	position: absolute;
	top: ${({ top }) => top};
	left: 20px;
	opacity: ${({ isActive }) => (isActive ? 1 : 0)};
	pointer-events: ${({ isActive }) => (isActive ? 'all' : 'none')};
	z-index: 20;
`;
const Backdrop = styled.div<StyledProps>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: transparent;
	opacity: ${({ isActive }) => (isActive ? 1 : 0)};
	pointer-events: ${({ isActive }) => (isActive ? 'all' : 'none')};
	z-index: 10;
`;
const SelectEmoji: React.FC<Props> = ({
	isEmojiActive,
	top,
	setEmojiActive,
	selectedList,
}) => {
	const dispatch = useDispatch();
	return (
		<Backdrop
			data-bd="backdrop"
			onClick={(e) => {
				const data = (e.target as Element).getAttribute('data-bd');
				if (data) {
					setEmojiActive(false);
				} else {
					return;
				}
			}}
			isActive={isEmojiActive}
		>
			<EmojiContainer isActive={isEmojiActive} top={top}>
				<Picker
					native
					onSelect={(emoji) => {
						const em = ('native' in emoji ? emoji.native : undefined) as string;
						dispatch(updateListEmoji(em));
						const t = localStorage.getItem('token');
						dispatch(postUpdateListData(t, selectedList));
						setEmojiActive(false);
					}}
					showPreview={false}
					showSkinTones={false}
					title="Pick your emoji…"
				/>
			</EmojiContainer>
		</Backdrop>
	);
};

export default SelectEmoji;
