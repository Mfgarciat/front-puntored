import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/logo-puntored.png';
import { MdLogin } from "react-icons/md";
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import styles from './Login.module.css';
import apiClient from '../../api/apiClient'; // ajusta la ruta según tu proyecto


const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await apiClient.post('/auth/login', credentials);
      login(data.accessToken); // guarda el token en el contexto
      navigate('/recharge/history');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Credenciales inválidas');
      } else {
        setError(err.response?.data?.message || 'Ocurrió un error al iniciar sesión');
      }
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <Loader data-testid="loader" />
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.logoContainer}>
          <img
            src={logo}
            alt="Puntored Logo"
            className={styles.logoImage}
          />
        </div>
        <div className={styles.titleContainer}>
          <h2>Iniciar sesión</h2>
        </div>
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            label="Correo electrónico"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />

          <Input
            id="password"
            type="password"
            label="Contraseña"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />

          <div className={styles.contentButton}>
            <Button
              type="submit"
              disabled={loading}
              Icon={MdLogin}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;