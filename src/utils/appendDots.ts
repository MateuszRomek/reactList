export const apppendDots = (name: string): string => {
	const newName = name.substring(0, 18) + '...';
	return newName;
};
