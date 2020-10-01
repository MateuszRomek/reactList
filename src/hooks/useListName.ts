import { useState } from 'react';

const useListName = (): [
	string | undefined,
	(listName: string | undefined) => void
] => {
	const [currentListName, setListname] = useState<string | undefined>('');
	const setCurrentListName = (listName: string | undefined) =>
		setListname(listName);
	return [currentListName, setCurrentListName];
};

export default useListName;
