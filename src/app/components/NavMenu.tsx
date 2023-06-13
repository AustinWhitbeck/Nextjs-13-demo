import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "../auth"
import styles from '../layout.module.css';

const NavMenu =  async () => {
  const session = await getServerSession(authOptions);
  let userName = '...loading';
  if (session?.user.name) {
    userName = session.user.name;
  }
  
  return (
    <div className={styles.navbar}>
      <div className={styles.flexRow}>
        <LoginButton />
        <LogoutButton />
        <p>Welcome, {userName} </p>
      </div>
    </div>
  )
}

export default NavMenu