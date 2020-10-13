const adjustElementHeight = <T>(e: React.KeyboardEvent<T>) => {
	const areaElement = e.target as HTMLElement;
	areaElement.style.height =
		areaElement.scrollHeight > areaElement.clientHeight
			? areaElement.scrollHeight + 'px'
			: '35px';
};

export default adjustElementHeight;
