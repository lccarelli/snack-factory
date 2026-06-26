// Next.js 16 renamed Middleware to Proxy. next-intl's request handler works the
// same way — we just export it from proxy.ts instead of middleware.ts.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API, Next internals and files with an extension
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
