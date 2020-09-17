import React from 'react';
import { ReactComponent as LeftArrow } from '../../assets/svg/leftArrow.svg';
import {
	FlexContainer,
	StyledLink,
	StyledSvg,
	ElementTitle,
} from '../Shared/SharedSignUpLogIn';
import LogInForm from './LogInForm/LogInForm';
const LogIn: React.FC = () => {
	return (
		<FlexContainer>
			<ElementTitle>Log In</ElementTitle>
			<LogInForm />
			<StyledLink to="/">
				<StyledSvg>
					<LeftArrow />
				</StyledSvg>
				Back to Sign Up
			</StyledLink>
		</FlexContainer>
	);
};

export default LogIn;
