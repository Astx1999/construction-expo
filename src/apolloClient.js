import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// Replace with your GraphQL endpoint URL
const graphqlEndpoint = 'https://api.armauto.show/v1/graphql';

// Create an HTTP link to your GraphQL endpoint
const httpLink = new HttpLink({
    uri: graphqlEndpoint,
});

// Add authentication header
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken');
    return {
        headers: {
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    };
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, extensions }) => {
            if (extensions.code === 'invalid-jwt') {
                // Main app doesn't use admin session; just clear any stale tokens.
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("userId");
                localStorage.removeItem("userRole");
            }
        });
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

// Create the Apollo Client instance with the error link, auth link, and cache
export const authClient = new ApolloClient({
    link: from([errorLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache(),
});

// Regular client without authentication
export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
