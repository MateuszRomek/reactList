import { List } from '../redux/types/listsTypes';

const findList = (id: string, defaultList: List[], userList: List[]): List => {
	let findList: List[];
	findList = defaultList.filter((list) => list._id === id);
	if (findList.length === 0) {
		findList = userList.filter((list) => list._id === id);
	}

	return findList[0];
};

export default findList;
