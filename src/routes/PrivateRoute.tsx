import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getUserOnRefresh } from '../redux/ducks/user';
import { IuserReducer } from '../redux/types/userTypes';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
	const isAuth = useSelector((state: IuserReducer) => state.user.isAuth);
	const isLoading = useSelector((state: IuserReducer) => state.user.isLoading);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUserOnRefresh());
	}, [dispatch]);

	if (isLoading) {
		return <div></div>;
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuth ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

export default PrivateRoute;
