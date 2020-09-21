import { createStore, combineReducers, compose } from 'redux';
import userReducer from '../ducks/user';
import uiReducer from '../ducks/ui';
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
const store = createStore(rootReducer, composeEnhancers());

export default store;
