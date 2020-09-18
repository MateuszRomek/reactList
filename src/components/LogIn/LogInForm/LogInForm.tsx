import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
//import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
	FormElementContainer,
	FormLabel,
	FormInput,
	FormButton,
	ErrorMessage,
} from '../../Shared/SharedFormElements';

const validationSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email address is required'),
	password: Yup.string().required('No password provided'),
});

const LogInForm: React.FC = () => {
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

				const response = await data.json();
				if (data.status !== 200) {
					throw response;
				}
				localStorage.setItem('token', response.token);
				//Set user redux data.
				actions.resetForm();
				history.push('/todos');
			} catch (err) {
				//TODO Inform user about error
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
