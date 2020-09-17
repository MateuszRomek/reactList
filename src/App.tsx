import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import SignUpLogInTemplate from './templates/SignUpLogIn/SignLoginTemplate';
const App: React.FC = () => {
	return (
		<>
			<GlobalStyle />
			<SignUpLogInTemplate />
		</>
	);
};

export default App;
