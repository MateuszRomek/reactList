import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useListName from '../../../hooks/usePreviousName';
import { changeTodoDesc, postUpdateTodo } from '../../../redux/ducks/todo';
import adjustElementHeight from '../../../utils/adjustElementHeight';
interface Props {
	todoId: string;
	taskDesc: string;
	currentListId: string;
}
const TextArea = styled.textarea`
	font-size: 1.6rem;
	font-family: inherit;
	min-height: 10rem;
	margin-top: 2rem;
	resize: none;
	font-weight: 400;
	padding: 0.6rem;
	width: 100%;
	border: 1px solid ${({ theme }) => theme.colors.borderGrayColor};
	overflow: hidden;
	&:focus {
		outline: 1px solid ${({ theme }) => theme.colors.darkGray};
	}
`;

const TaskDescription: React.FC<Props> = ({
	taskDesc,
	todoId,
	currentListId,
}) => {
	const [localDesc, setLocalDesc] = useState(taskDesc);
	const dispatch = useDispatch();
	const [previousName, setPreviousName] = useListName();
	useEffect(() => {
		setLocalDesc(taskDesc);
	}, [taskDesc]);

	const handleBlur = () => {
		if (previousName !== localDesc) {
			dispatch(changeTodoDesc(localDesc));
			const t = localStorage.getItem('token');
			postUpdateTodo(t, todoId, 'description', localDesc, currentListId);
		}
	};
	return (
		<TextArea
			ref={(x) => {
				x && (x.style.height = `${x?.scrollHeight}px`);
			}}
			onFocus={() => setPreviousName(taskDesc)}
			onBlur={handleBlur}
			onKeyDown={(e) => adjustElementHeight<HTMLTextAreaElement>(e)}
			onKeyUp={(e) => adjustElementHeight<HTMLTextAreaElement>(e)}
			value={localDesc}
			onChange={(e) => setLocalDesc(e.target.value)}
		/>
	);
};

export default TaskDescription;
