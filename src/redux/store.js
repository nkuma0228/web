import { createStore,applyMiddleware,compose} from "redux";
import rootReducer from "./rootReduer";
import ReduxThunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreMiddleware=composeEnhancers(applyMiddleware(
    ReduxThunk
))(createStore)
const store=createStoreMiddleware(rootReducer);
export default store