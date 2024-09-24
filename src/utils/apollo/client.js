/* eslint-disable import/no-unresolved */
import { ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cookies } from 'next/headers';

import {
  registerApolloClient,
  InMemoryCache,
  ApolloClient,
} from '@apollo/experimental-nextjs-app-support';

import config from '../config';

const httpLink = new HttpLink({
  uri: config.debug ? config.graphQlUriDev : config.graphQlUri,
  credentials: 'same-origin',
});

const authLink = setContext(async (_, { headers }) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const modifiedHeader = {
    headers: {
      ...headers,
      authorization: token,
    },
  };
  return modifiedHeader;
});

const client = new ApolloClient({
  // link: from([authLink, httpLink]), from new docs

  link: ApolloLink.from([authLink.concat(httpLink)]),
  cache: new InMemoryCache({
    addTypename: false, // Disable the automatic addition of __typename
  }),
});

// const apolloClientSsr = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// })

// export const apolloQuerySsr = async ({
//   ctx,
//   query,
//   variables = {},
//   isPrivate = false,
// }: {
//   ctx: any
//   query: any
//   variables: any
//   isPrivate: boolean
// }) => {
//   const { req } = ctx

//   const token = ''
//   if (!token && isPrivate) {
//     return {
//       redirect: {
//         destination: '/auth/login',
//         permanent: false,
//       },
//     }
//   }

//   try {
//     const { data, error } = await apolloClientSsr.query({
//       context: {
//         headers: {
//           Authorization: token || '',
//         },
//       },
//       query,
//       variables,
//     })
//     if (error != null) {
//       console.log('ssr error', error)
//     }
//     // console.log('ssr', variables, data, error);
//     return data
//   } catch (e: any) {
//     console.log('e', e.message)
//     return {}
//   }
// }

export default client;

export const { getClient } = registerApolloClient(
  () =>
    new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: config.debug ? config.graphQlUriDev : config.graphQlUri,
        credentials: 'same-origin',
      }),
    }),
);
