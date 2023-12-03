import CredentialsProvider from "next-auth/providers/credentials";
import userModel from "../../../models/userModel";
import dbConnect from "../../../lib/mongoose";

export const authOptions = {
  pages: {
    signIn: "/login",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials, req) {
        // console.log(credentials);
        await dbConnect();
        const user = await userModel.findOne(
          { email: credentials.email, password: credentials.password },
          {
            password: 0,
          }
        );
        if (user && user.email) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        // token.role = user.role;
        // token.email = user.email;
        token.user = user;
        // token.accessToken = user.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Send properties to the client, like an access_token from a provider.
      // session.user.role = token.role;
      session.user = token.user;
      // session.accessToken = token.accessToken;
      return session;
    },
  },
};
export default authOptions;
