export { default } from "next-auth/middleware";

// WARNING
//  NOTE/TODO: downgraded to 13.4.3 to make the router work. There is a bug on 13.4.4

export const config = {
  matcher: ["/dashboard", "/app/:path*", "/other/:path*", "/help/:path*"],
};
