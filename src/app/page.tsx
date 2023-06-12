import { getServerSession } from "next-auth"
import { prisma } from "./lib/prisma"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { User } from "./user";
import { LoginButton, LogoutButton } from "./auth";


// ** NOTES ** //

/*

    In this file, we can compare the speed of availability between the server and the client side calls.
  When you refresh the page there is a delay between the client call being available and when you refresh.

  Why?

  Steps for client side to get this info

  1. request server decode jwt
  2. get session information
  3. then display it

  it's going to return undefined or null the first time as it waits to get it from the server.

*/

export default async function Home() {
  // Need to use the same options as the setup from the prisma file.
  // if anything changes, has the options available to re pass that through.
  const session = await getServerSession(authOptions);

  return (
   
    <main>
      <LoginButton />
      <LogoutButton />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User />
    </main>
  )
}
