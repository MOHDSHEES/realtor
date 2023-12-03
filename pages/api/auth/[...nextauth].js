import NextAuth from "next-auth";
import authOptions from "./options";

export default NextAuth(authOptions);

// export { handler as GET, handler as POST };
