import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import userReducer from '../ducks/user';
import uiReducer from '../ducks/ui';
import thunk from 'redux-thunk';
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const rootReducer = combineReducers({
	user: userReducer,
	ui: uiReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
