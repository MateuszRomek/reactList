import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ToDoSvg } from '../../assets/svg/todoUndraw.svg';
import { Switch, Route } from 'react-router-dom';
import SignUp from '../../components/SignUp/SignUp';
import LogIn from '../../components/LogIn/LogIn';
import { ReactComponent as ToDoLogo } from '../../assets/svg/todoLogo.svg';
import ReactModal from '../../components/UI/ReactModal/ReactModal';
interface StyledProps {
	isWhite: boolean;
}

const GridTemplate = styled.div`
	width: 100%;
	height: 100vh;
	display: grid;
	grid-template-columns: 40% 60%;
	position: relative;
	@media (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`;
const SvgContainer = styled.div`
	& svg {
		width: 100%;
		height: 100%;
	}
`;
const FlexCenter = styled.div<StyledProps>`
	align-items: center;
	justify-content: center;
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: ${(props) =>
		props.isWhite ? 'null' : props.theme.colors.ocean};
	color: white;
	overflow: hidden;
`;
const DummyContainer = styled.div`
	display: flex;
	width: 100%;
	@media (max-width: 900px) {
		display: none;
	}
`;
const Title = styled.h1`
	margin-top: 0;
	font-size: 4.2rem;
	font-weight: 700;
	text-align: center;
	@media (max-width: 900px) {
		font-size: 2.2rem;
		color: ${({ theme }) => theme.colors.darkText};
		margin: 0 0 0 0.5rem;
	}
`;
const SubTitle = styled.h2`
	margin: 0;
	font-size: 3.6rem;
	font-weight: 700;
	text-align: center;
`;

const MobileHeader = styled.div`
	display: none;
	color: ${({ theme }) => theme.colors.darkText};
	@media (max-width: 900px) {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 1rem;
		left: 1rem;
	}
	& svg {
		display: block;
		width: 35px;
		height: 35px;
	}
`;

const SignUpLogIn: React.FC = () => {
	return (
		<GridTemplate>
			<ReactModal />
			<DummyContainer>
				<FlexCenter isWhite={false}>
					<SvgContainer>
						<Title>To-Dos</Title>
						<SubTitle>Your best To-Do App</SubTitle>
						<ToDoSvg />
					</SvgContainer>
				</FlexCenter>
			</DummyContainer>
			<FlexCenter isWhite={true}>
				<MobileHeader>
					<ToDoLogo />
					<Title>To-Dos</Title>
				</MobileHeader>
				<Switch>
					<Route path="/login" component={LogIn} />
					<Route path="/" component={SignUp} />
				</Switch>
			</FlexCenter>
		</GridTemplate>
	);
};

export default SignUpLogIn;
