import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import {
	FormElementContainer,
	FormLabel,
	FormInput,
	FormButton,
	ErrorMessage,
} from '../../Shared/SharedFormElements';
import { useDispatch } from 'react-redux';
import { toggleModal, setModalData } from '../../../redux/ducks/ui';
const validationSchema = Yup.object({
	name: Yup.string().required('This field cannot be empty'),
	email: Yup.string()
		.email('Invalid email address')
		.required('Email address is required'),
	password: Yup.string()
		.required('No password provided')
		.min(8, 'Password is too short - should be 8 characters minimum')
		.matches(
			/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
			'Password should contain at least one letter, one big letter, one number and one special character'
		),
});

interface Props {
	history: object;
}

const SignUpForm: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values, actions) => {
			try {
				const data = await fetch('http://localhost:8080/auth/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: values.name,
						email: values.email,
						password: values.password,
					}),
				});
				const response = await data.json();
				if (data.status !== 200) {
					throw response;
				}
				actions.resetForm();
				history.push('/login');
			} catch (err) {
				if (err.error) {
					const { message, error } = err;
					const modalContent = error[0].msg;
					dispatch(setModalData(message, modalContent));
					dispatch(toggleModal());
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
				<FormLabel htmlFor="name">Your Name</FormLabel>
				<FormInput
					type="text"
					required
					name="name"
					id="name"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.name}
				/>
				{formik.touched.name && formik.errors.name ? (
					<ErrorMessage>{formik.errors.name}</ErrorMessage>
				) : null}
			</FormElementContainer>
			<FormElementContainer>
				<FormLabel htmlFor="email">Email Adress</FormLabel>
				<FormInput
					type="email"
					required
					name="email"
					id="email"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
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

			<FormButton type="submit">Create account</FormButton>
		</form>
	);
};

export default SignUpForm;
