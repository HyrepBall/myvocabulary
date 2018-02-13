import React from 'react';
import ReactDOM from 'react-dom';
import { createStore  } from 'redux';
import { Provider } from 'react-redux';

import ContextProvider from './ContextProvider';
import App from './App';
import vocabularyReducer from './reducers'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(vocabularyReducer);

ReactDOM.render(
	<Provider store={store}>
		<ContextProvider>
			<App/>
		</ContextProvider>
	</Provider>,
	document.getElementById('root') );
registerServiceWorker();
