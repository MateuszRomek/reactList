export const apppendDots = (stringIndex: number, name: string): string => {
	const newName = name.substring(0, stringIndex) + '...';
	return newName;
};
