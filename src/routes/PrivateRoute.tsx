import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IuserReducer } from '../redux/types/userTypes';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
	const selector = useSelector(({ user }: IuserReducer) => ({
		name: user.name,
		userId: user.userId,
		email: user.email,
	}));
	const v =
		localStorage.getItem('token') &&
		selector.name &&
		selector.userId &&
		selector.email
			? true
			: false;

	return (
		<Route
			{...rest}
			render={(props) => (v ? <Component {...props} /> : <Redirect to="/" />)}
		/>
	);
};

export default PrivateRoute;
