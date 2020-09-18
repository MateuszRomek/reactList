import { createStore, combineReducers, compose } from 'redux';
import UserReducer from '../ducks/user';
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const rootReducer = combineReducers({
	UserReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers());

export default store;
