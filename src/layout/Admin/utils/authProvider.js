import {SIGN_IN_QUERY} from "../../../graphql/queries";
import {authClient} from "../../../apolloClient";

export const resetSession = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
};

const authProvider = {
    login: async ({email, password}) => {
        try {
            const {data} = await authClient.query({
                query: SIGN_IN_QUERY,
                variables: {email, password}
            });
            const {accessToken, user} = data.signIn.session;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userId', user.id);
            localStorage.setItem('userRole', user.roles[0]);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    },
    logout: () => {
        resetSession()
        return Promise.resolve();
    },
    checkAuth: () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            return Promise.resolve({redirectTo: '/nbspkkwwdsc'});
        } else {
            return Promise.reject();
        }
    },
    checkError: (error) => {
        // Check for GraphQL errors
        if (error.graphQLErrors) {
            // Look for 'invalid-jwt' error in the GraphQL response
            const jwtError = error.graphQLErrors.find(
                (err) => err.extensions?.code === 'invalid-jwt'
            );

            if (jwtError) {
                // Remove any stored tokens or user data
                resetSession()
                // Redirect the user to the login page
                return Promise.reject({ redirectTo: '/login' });
            }
        }

        // If no relevant error, resolve the check
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
