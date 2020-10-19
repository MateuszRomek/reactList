import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import TasksListTitle from './TasksListTitle.tsx/TasksListTitle';
import AddNewTask from './AddNewTask/AddNewTask';
import SelectEmoji from './SelectEmoji/SelectEmoji';
import Task from './Task/Task';
import { useSelector } from 'react-redux';
import { IlistsReducer } from '../../redux/types/listsTypes';
import { TodoSelector } from '../../redux/types/todoTypes';
import ContextMenu from '../ContextMenu/ContextMenu';

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 2.5rem 2rem;
	width: 100%;
	height: 100vh;
	position: relative;
	will-change: width;
	@media (max-width: 950px) {
		padding-left: 7rem;
	}
`;

const TasksListContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 1rem 0 1.5rem;
	overflow-y: auto;
`;

const TasksContainer: React.FC = () => {
	const [isEmojiActive, setEmojiActive] = useState(false);
	const [topPosition, setTopPosition] = useState('0');
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
	const [contextTodoId, setContextTodoId] = useState('');
	const selectedList = useSelector(
		(state: IlistsReducer) => state.lists.currentList
	);
	const todos = useSelector((state: TodoSelector) => state.todo.todos);
	const containerRef = useRef<HTMLDivElement>(null);
	return (
		<Container ref={containerRef} className="tasks">
			{showContextMenu && (
				<ContextMenu
					contextTodoId={contextTodoId}
					contextMenuPosition={contextMenuPos}
					setShowContextMenu={setShowContextMenu}
					showContextMenu={showContextMenu}
				/>
			)}
			<TasksListTitle
				selectedList={selectedList}
				setEmojiActive={setEmojiActive}
				setTopPosition={setTopPosition}
			/>
			<TasksListContainer>
				{todos
					.filter(({ _id }) => selectedList.todos.indexOf(_id) > -1)
					.map((todo) => (
						<Task
							setContextTodoId={setContextTodoId}
							containerRef={containerRef}
							setContextMenuPosition={setContextMenuPos}
							setShowContextMenu={setShowContextMenu}
							todoId={todo._id}
							isChecked={todo.isChecked}
							key={todo._id}
							todoTitle={todo.title}
						/>
					))}
			</TasksListContainer>
			<AddNewTask listId={selectedList._id} />
			<SelectEmoji
				selectedList={selectedList}
				top={topPosition}
				isEmojiActive={isEmojiActive}
				setEmojiActive={setEmojiActive}
			/>
		</Container>
	);
};

export default TasksContainer;
