import { useState } from 'react';

const usePreviousName = (): [
	string | undefined,
	(listName: string | undefined) => void
] => {
	const [currentListName, setListname] = useState<string | undefined>('');
	const setCurrentListName = (listName: string | undefined) =>
		setListname(listName);
	return [currentListName, setCurrentListName];
};

export default usePreviousName;
