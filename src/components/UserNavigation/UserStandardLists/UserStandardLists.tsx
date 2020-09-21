import React from 'react';
import styled from 'styled-components';
import List from '../List/List';

const Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

interface Props {
	listName: string;
	ListIcon: React.FC;
}

const UserStandardsLists: React.FC<Props> = ({ ListIcon, listName }) => {
	return (
		<Container>
			<List ListIcon={ListIcon} listName={listName} />
		</Container>
	);
};

export default UserStandardsLists;
