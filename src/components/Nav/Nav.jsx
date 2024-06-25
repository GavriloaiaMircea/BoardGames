import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import styles from './Nav.module.css';
import clsx from 'clsx';
import { useAuthContext } from '@/features/Auth/AuthContext';

export function Nav() {
  const { user, logout } = useAuthContext();
  return (
    <nav className={styles.topNav}>
      <img src={logo} alt="Logo of Nagarro" width="120" />
      <menu className={clsx(styles.mainMenu, 'flex-grow')}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="boardgames">Boardgames</NavLink>
        </li>
        
        {user && (
          <li className="ml-auto">
            Welcome, {user.firstName}! 
            <a href="#" onClick={(e) => {
              e.preventDefault();
              logout();
            }}>Logout</a>
          </li>
        )}
        {!user && (
          <>
            <li className="ml-auto">
              <NavLink to="register">Register</NavLink>
            </li>
            <li>
              <NavLink to="login">Login</NavLink>
            </li>
            </>
        )}
      </menu>
    </nav>
  );
}
