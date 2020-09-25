import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import SignUpLogInView from './views/SignUpLogInView/SignLoginView';
import RootView from './views/RootView/RootView';
import PrivateRoute from './routes/PrivateRoute';

const App: React.FC = () => {
	return (
		<>
			<GlobalStyle />
			<Switch>
				{/* <PrivateRoute path="/todos/:todoName" component={RootView} />
				<PrivateRoute path="/todos" component={RootView} /> */}

				<Route path="/todos/:todoName" component={RootView} />
				<Route path="/todos" component={RootView} />
				<Route path="/" component={SignUpLogInView} />
			</Switch>
		</>
	);
};

export default App;
