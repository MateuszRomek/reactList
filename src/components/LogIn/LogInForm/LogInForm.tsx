import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUserData } from '../../../redux/ducks/user';
import {
	FormElementContainer,
	FormLabel,
	FormInput,
	FormButton,
	ErrorMessage,
} from '../../Shared/SharedFormElements';
import { setModalData, toggleModal } from '../../../redux/ducks/ui';

interface ErrorObject {
	[key: string]: {
		errorText: string;
	};
}
interface CorrectResponseObject {
	uid: string;
	token: string;
	name: string;
}
interface FailedResponseObject {
	message: string;
	data?: ErrorObject[];
	status: number;
}

type ResponseServer = CorrectResponseObject & FailedResponseObject;

const validationSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email address is required'),
	password: Yup.string().required('No password provided'),
});

const LogInForm: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values, actions) => {
			try {
				const data = await fetch('http://localhost:8080/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: values.email,
						password: values.password,
					}),
				});
				const response: ResponseServer = await data.json();
				if (data.status !== 200) {
					throw response;
				}
				const { name, uid, token } = response;
				localStorage.setItem('token', token);
				dispatch(setUserData(uid, name));
				actions.resetForm();
				history.push('/todos');
			} catch (err) {
				if (err.error) {
					const { message, error } = err;
					const modalContent = error[0].msg;
					dispatch(setModalData(message, modalContent));
					dispatch(toggleModal);
				} else {
					const { message } = err;
					dispatch(setModalData('Error!', message));
					dispatch(toggleModal());
				}
			}
		},
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<FormElementContainer>
				<FormElementContainer>
					<FormLabel htmlFor="email">Your Email Adress</FormLabel>
					<FormInput
						type="email"
						name="email"
						id="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email ? (
						<ErrorMessage>{formik.errors.email}</ErrorMessage>
					) : null}
				</FormElementContainer>

				<FormElementContainer>
					<FormLabel htmlFor="password">Password</FormLabel>
					<FormInput
						type="password"
						name="password"
						id="password"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
					{formik.touched.password && formik.errors.password ? (
						<ErrorMessage>{formik.errors.password}</ErrorMessage>
					) : null}
				</FormElementContainer>
			</FormElementContainer>
			<FormButton type="submit"> Log in</FormButton>
		</form>
	);
};

export default LogInForm;
