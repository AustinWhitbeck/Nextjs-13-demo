import { prisma } from "../../lib/prisma"

export default async function Home() {
  const user = await prisma.user.findFirst({
    where: {
      email: `test@test.com`,
    }
  })

  const userRenderResult = () => {
    if (user) {
      return <h1> Hello {user.name} !</h1>
    }
    return <h1> No user Found</h1>
  };

  return (
   
    <main>
      {userRenderResult()}
    </main>
  )
}
