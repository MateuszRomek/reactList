import React from 'react';
import { ReactComponent as RightArrow } from '../../assets/svg/rightArrow.svg';
import SignUpForm from './SignUpForm/SignUpForm';
import {
	FlexContainer,
	StyledLink,
	StyledSvg,
	ElementTitle,
} from '../Shared/SharedSignUpLogIn';

const SignUp: React.FC = () => {
	return (
		<FlexContainer>
			<ElementTitle>Sign up</ElementTitle>
			<SignUpForm />
			<StyledLink to="/login">
				Already have an account? Log in
				<StyledSvg>
					<RightArrow />
				</StyledSvg>
			</StyledLink>
		</FlexContainer>
	);
};

export default SignUp;
