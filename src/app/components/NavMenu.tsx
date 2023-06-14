import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "../auth"
import styles from '../layout.module.css';
import Link from "next/link";

const NavMenu =  async () => {
  const session = await getServerSession(authOptions);
  let userName = '...loading';
  if (!session) {
    userName = 'Guest';
  }
  if (session?.user.name) {
    userName = session.user.name;
  }


  const loginButtonsRender = () => {
    if (!session) {
      return (
        <>
          <LogoutButton />
          <p>Welcome, Guest! </p>
        </>
      );
    }
    if (session && session.user.name)
    return  (
      <>
        <LogoutButton />
        <p>Welcome, {session.user.name}! </p>
      </>
    );
  }

  
  return (
    <div className={styles.navbar}>
      <div className={styles.navLinkContainer}>
        <Link href="/pricing">Pricing</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <div className={styles.flexRow}>
        {loginButtonsRender()}
      </div>
    </div>
  )
}

export default NavMenu