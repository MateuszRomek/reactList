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
	},
};

export default themeData;
