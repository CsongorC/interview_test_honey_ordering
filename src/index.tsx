import { createRoot } from 'react-dom/client';
import { createStore, applyMiddleware, Store } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import App from './App';
import { reducer } from './reducer/reducer';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

import { combineReducers } from 'redux';

const reducers = combineReducers({
    basket: reducer
});


const store = createStore(reducers, {}, applyMiddleware(thunk));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
    
);
