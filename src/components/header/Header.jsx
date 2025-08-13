import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import logo from '../../assets/logo-puntored.png';
import { useAuth } from '../../hooks/useAuth'; 
import { MdLogout } from "react-icons/md";
import Button from '../button/Button';

const Header = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer} onClick={() => navigate('/')}>
        <img
          src={logo}
          alt="Puntored Logo"
          className={styles.logoImage}
        />
      </div>


      {token && (

        <Button
          type="button"
          onClick={handleLogout}
          className={styles.logoutButton}
          Icon={MdLogout}
          width={'auto'}
        >
          Cerrar Sesión
        </Button>
      )}
    </header>
  );
};

export default Header;