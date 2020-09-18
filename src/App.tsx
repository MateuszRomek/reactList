import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import SignUpLogInTemplate from './templates/SignUpLogIn/SignLoginTemplate';
import RootViewTemplate from './templates/RootView/RootViewTemplate';
const App: React.FC = () => {
	return (
		<>
			<GlobalStyle />
			<Switch>
				<Route path="/todos" component={RootViewTemplate} />
				<Route path="/" component={SignUpLogInTemplate} />
			</Switch>
		</>
	);
};

export default App;
