/* eslint-disable import/no-unresolved */

'use client';

import React from 'react';

import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { ApolloLink, HttpLink } from '@apollo/client';

import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';

import config from '../config';

function makeClient() {
  const authLink = setContext(async (_, { headers }) => {
    const token = localStorage.getItem('token');

    const modifiedHeader = {
      headers: {
        ...headers,
        authorization: token || '',
      },
    };
    return modifiedHeader;
  });

  const httpLink = new HttpLink({
    uri: config.debug ? config.graphQlUriDev : config.graphQlUri,
    fetchOptions: { cache: 'no-store' },
  });

  const errorLink = onError(({ networkError }) => {
    // if (graphQLErrors) {
    //   graphQLErrors.forEach(({ message }) => {
    //     console.log(` ${message}`);
    //     if (message && message?.includes('Not logged in')) {
    //       console.log('Not logged in');
    //       Cookies.remove('token');
    //       router.refresh();
    //     }
    //   });
    // }

    if (networkError) {
      console.error(`Network error ${networkError}`);
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false, // Disable the automatic addition of __typename
    }),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            errorLink,
            authLink,
            httpLink,
          ])
        : ApolloLink.from([errorLink, authLink, httpLink]),
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
