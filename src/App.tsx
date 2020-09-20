import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import SignUpLogInTemplate from './templates/SignUpLogIn/SignLoginTemplate';
import RootViewTemplate from './templates/RootView/RootViewTemplate';
import PrivateRoute from './routes/PrivateRoute';

const App: React.FC = () => {
	return (
		<>
			<GlobalStyle />
			<Switch>
				<PrivateRoute path="/todos" Component={RootViewTemplate} />
				<Route path="/" component={SignUpLogInTemplate} />
			</Switch>
		</>
	);
};

export default App;
