import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values, actions) => {
			console.log(values);
			actions.resetForm();
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<FormElementContainer>
				<FormElementContainer>
					<FormLabel htmlFor="email">Your Email Adress</FormLabel>
					<FormInput
						type="email"
						required
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
						required
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
			<FormButton> Log in</FormButton>
		</form>
	);
};

export default LogInForm;
