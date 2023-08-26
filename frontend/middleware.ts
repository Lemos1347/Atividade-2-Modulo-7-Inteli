import { withAuth } from "next-auth/middleware";
import router from "next/navigation";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// middleware is applied to all routes, use conditionals to select

// Receiving this in token
interface Token {
  name: string;
  email: string;
  accessToken: string;
  roles: string[];
}

// export default withAuth(function middleware(req) {}, {
//   callbacks: {
//     authorized: ({ req, token }) => {
//       if (req.nextUrl.pathname.startsWith("/") && token === null) {
//         return false;
//       }
//       if (req.nextUrl.pathname.startsWith("/admin")) {
//         if ((token as any).roles.includes("ADMIN")) return true;
//         NextResponse.redirect(new URL('/', req.url))
//         return false;
//       }
//       return true;
//     },
//   },
// });

export { default } from "next-auth/middleware";

const baseURL = "http://localhost:3000";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (
    request.nextUrl.pathname.startsWith("/") &&
    !request.nextUrl.pathname.startsWith("/api/auth") &&
    !token
  ) {
    return NextResponse.redirect(`${baseURL}/api/auth/signin`);
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if ((token as any).roles.includes("ADMIN")) return NextResponse.next();
    return NextResponse.redirect(`${baseURL}/`);
  }
}
