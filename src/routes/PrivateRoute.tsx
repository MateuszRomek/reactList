import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IuserReducer } from '../redux/types/userTypes';

const PrivateRoute = ({ Component, ...rest }: any) => {
	const selector = useSelector(({ user }: IuserReducer) => ({
		name: user.name,
		userId: user.userId,
	}));
	const val = localStorage.getItem('token') && selector.name && selector.userId;
	return (
		<Route
			{...rest}
			render={(props) => (val ? <Component {...props} /> : <Redirect to="/" />)}
		/>
	);
};

export default PrivateRoute;
