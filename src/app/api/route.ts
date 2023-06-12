import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "./auth/[...nextauth]/route";

// SERVER SIDE ROUTE //

export async function GET(request: Request) {
  //   Step 1, get the session, runs on the server.
  const session = await getServerSession(authOptions);
  console.log("GET API", session);

  // NOTE: handle if not authenticated, protect this route.
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  return NextResponse.json({ authenticated: !!session });
}
