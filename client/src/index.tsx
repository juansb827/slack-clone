/**
 *
 */
import React from 'react'; //
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink, } from 'apollo-link-http';
import { onError,  } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import './index.css';
import Routes from './routes/index';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
/*
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
    
    
}); */

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      'x-token': localStorage.getItem('token'),
      'x-refresh-token': localStorage.getItem('refreshToken'),
    },
  });

  return forward(operation);
})

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;
    if (headers && headers.get('x-token') && headers.get('x-refresh-token')) {
      const token = headers.get('x-token');
      const refreshToken = headers.get('x-token');
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('Response with tokens');
    }
    
    return response;
  });
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authMiddleware,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    afterwareLink.concat(new HttpLink({
      uri: 'http://localhost:8080/graphql',
      credentials: 'same-origin'
    })),
    
  ]),
  cache: new InMemoryCache(),
  
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
