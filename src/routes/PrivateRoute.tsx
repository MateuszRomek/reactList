import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLogin from '../utils/isLogin';
const PrivateRoute = ({ Component, ...rest }: any) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				isLogin() ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

export default PrivateRoute;
