import React from 'react';
import styled from 'styled-components';
interface Props {}
const TaskDetailsContainer = styled.div`
	width: 350px;
	background-color: ${({ theme }) => theme.colors.lightGray};
`;
const TaskDetails: React.FC<Props> = () => {
	return <TaskDetailsContainer></TaskDetailsContainer>;
};

export default TaskDetails;
