interface color {
	[key: string]: string;
}
interface theme {
	colors: color;
}
const themeData: theme = {
	colors: {
		ocean: 'rgb(58, 175, 169)',
		deepSea: 'rgb(43, 122, 120)',
		lightBlue: 'rgb(222, 242, 241)',
		darkText: 'rgb(23, 37, 42)',
		borderGrayColor: 'rgb(229, 229, 229)',
		lightGray: 'rgb(244, 244, 244)',
		selectedListLight: 'rgb(237,237,237)',
		hoverListLight: 'rgb(255,255,255)',
		darkGray: 'rgb(78,92,99)',
		red: 'rgb(195, 52, 52)',
	},
};

export default themeData;
