export const AmplifyAuthConfig: any = {
  userPoolId: import.meta.env.VITE_AMPLIFY_AUTH_USER_POOL_ID,
  userPoolClientId: import.meta.env.VITE_AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID,
  signUpVerificationMethod: "code",
  loginWith: {
    oauth: {
      domain: import.meta.env.VITE_AMPLIFY_AUTH_COGNITO_DOMAIN,
      scope: [
        "phone",
        "email",
        "profile",
        "openid",
        "aws.cognito.signin.user.admin",
      ],
      redirectSignIn: import.meta.env.VITE_FRONTEND_BASE_URL,
      redirectSignOut: import.meta.env.VITE_FRONTEND_BASE_URL,
      clientId: import.meta.env.VITE_AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID,
      responseType: "code",
    },
  },
};
