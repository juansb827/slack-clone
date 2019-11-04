/**
 *
 */
import React from 'react'; //
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import './index.css';
import Routes from './routes/index';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    request: async (operation) => {
        operation.setContext({
          headers: {
            'x-token': localStorage.getItem('token'),
            'x-refresh-token': localStorage.getItem('refreshToken'),
          },
        });
      },
    
});

const App: any = (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
);
ReactDOM.render(App, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
