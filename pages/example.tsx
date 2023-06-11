import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from '../src/app/lib/prisma';

export const getServerSideProps: GetServerSideProps = async (context) => {
      const user = await prisma.user.findFirst({
    where: {
      email: `test@test.com`,
    }
  })
    return({
        props: {
            user
        }
    }
    )
}


type ExamplePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const ExamplePage = ({ user }: ExamplePageProps) => {

      const userRenderResult = () => {
    if (user) {
      return <h1> Hello {user.name} !</h1>
    }
    return <h1> No user Found</h1>
  };
  return (
    <div>{userRenderResult()}</div>
  )
}

export default ExamplePage;