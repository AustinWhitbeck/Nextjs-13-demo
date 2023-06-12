
// NOTE: Client side way of making a protected route

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";

    /*
      1. set the page to be client side 'use client'
      2. get the useSession hook
      3. in the 'onUnauthenticated() {}  key, redirect the user back to the login.

      EXAMPLE:

      cosnt { status } = useSession({
        required: true,
        onUnauthenticated(){
            /* logic to reroute to the login page 
        }
      })

    */

const Dashboard = async () => {

    // NOTE: Server side way of doing it if you want to do it PER PAGE and not with middleware;
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //     console.log('user is not logged in, probably redirect them');
    //     redirect('/api/auth/signin');
    // }


  return (
    <>
    <h1>Super Secret Page</h1>
    </>
  )
}

export default Dashboard