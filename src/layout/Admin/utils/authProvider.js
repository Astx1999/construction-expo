import { SIGN_IN_QUERY, REFRESH_TOKEN_QUERY } from "../../../graphql/queries";
import { authClient } from "../../../apolloClient";

export const resetSession = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
};

const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        return Promise.reject({ redirectTo: "/login" });
    }

    try {
        const { data } = await authClient.mutate({
            mutation: REFRESH_TOKEN_QUERY,
            variables: { refreshToken },
        });

        const { accessToken, refreshToken: newRefreshToken } = data.refreshToken;

        // Store new tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        return accessToken;
    } catch (error) {
        resetSession();
        return Promise.reject({ redirectTo: "/login" });
    }
};

const authProvider = {
    login: async ({ email, password }) => {
        try {
            const { data } = await authClient.query({
                query: SIGN_IN_QUERY,
                variables: { email, password },
            });

            const { accessToken, refreshToken, user } = data.signIn.session;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("userId", user.id);
            localStorage.setItem("userRole", user.roles[0]);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    },
    logout: () => {
        resetSession();
        return Promise.resolve();
    },
    checkAuth: async () => {
        let accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            return refreshToken();
        }
        return Promise.resolve();
    },
    checkError: async (error) => {
        if (error.graphQLErrors) {
            const jwtError = error.graphQLErrors.find(
                (err) => err.extensions?.code === "invalid-jwt"
            );

            if (jwtError) {
                try {
                    await refreshToken();
                    return Promise.resolve();
                } catch {
                    return Promise.reject({ redirectTo: "/login" });
                }
            }
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
