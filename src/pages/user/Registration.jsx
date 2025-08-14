import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import logo from '../../assets/logo-puntored.png';
import { MdLogin } from "react-icons/md";
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import styles from './Registration.module.css';
import { processRegistration } from '../../api/userService';

const Registration = () => {
    const data = {
        name: '',
        document: '',
        cellphone: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState(data);
    const [message, setMessage] = useState({
        open: false,
        msg: ''
    });

    const navigate = useNavigate();

    const validateForm = (name, value) => {
        if (name === 'name') {
            if (!value.trim()) {
                setError('El nombre es obligatorio');
            } else {
                setError(null);
            }
        }
        else if (name === 'document') {
            const docRegex = /^\d{6,15}$/;
            if (!docRegex.test(value) && value.length > 0) {
                setError('Documento inválido (solo números, mínimo 6 dígitos)');
            } else {
                setError(null);
            }
        }
        else if (name === 'cellphone') {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(value) && value.length > 0) {
                setError('Celular inválido debe tener 10 dígitos');
            } else {
                setError(null);
            }
        }
        else if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value) && value.length > 0) {
                setError('Correo electrónico inválido');
            } else {
                setError(null);
            }
        }
        else if (name === 'password') {
            if (value.length < 8) {
                setError('La contraseña debe tener al menos 8 caracteres');
            } else {
                setError(null);
            }
        }
        else if (name === 'confirmPassword') {
            if (value !== formData.password) {
                setError('Las contraseñas no coinciden');
            } else {
                setError(null);
            }
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateForm(name, value);

    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        setLoading(true);

        try {

            delete formData.confirmPassword;

            const result = await processRegistration(formData);
            if (result?.name) {

                setMessage({
                    open: true,
                    msg: `${result.name} te has registrado exitosamente.`
                });

            }
            setFormData(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Ocurrió un error al registrar el usuario');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader data-testid="loader" />;
    }

    if (message.open) {

    }

    return (
        <div className={styles.registrationContainer}>
            <div className={styles.registrationForm}>
                <div className={styles.logoContainer}>
                    <img
                        src={logo}
                        alt="Puntored Logo"
                        className={styles.logoImage}
                    />
                </div>
                <div className={styles.titleContainer}>
                    <h2>Registrar Usuario</h2>
                </div>
                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}

                {message.open && (
                    <div className={styles.successMessage}>
                        {message.msg}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <Input
                        id="name"
                        type="text"
                        label="Nombres y Apellidos"
                        placeholder="Ej: Maria Pérez"
                        maxLength="100"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.row}>
                        <Input
                            id="document"
                            type="text"
                            label="Documento de Identidad"
                            placeholder="Ej: 123456789"
                            maxLength="20"
                            value={formData.document}
                            onChange={handleChange}
                            required

                        />
                        <Input
                            id="cellphone"
                            type="number"
                            label="Celular"
                            placeholder="Ej: 3001234567"
                            maxLength="10"
                            value={formData.cellphone}
                            onChange={handleChange}
                            required

                        />
                    </div>
                    <Input
                        id="email"
                        type="email"
                        label="Correo electrónico"
                        placeholder="Ej: email@email.com"
                        maxLength="100"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <div className={styles.row}>
                        <Input
                            id="password"
                            type="password"
                            label="Contraseña"
                            placeholder="Debe tener al menos  8 caracteres"
                            maxLength="100"
                            value={formData.password}
                            onChange={handleChange}
                            required

                        />
                        <Input
                            id="confirmPassword"
                            type="password"
                            label="Confirmar Contraseña"
                            placeholder="Debe tener al menos 8 caracteres"
                            maxLength="100"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required

                        />
                    </div>
                    <div className={styles.contentButton}>
                        <Button
                            type="submit"
                            disabled={loading}
                            Icon={MdLogin}
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </Button>
                    </div>

                    <Button
                        type="button"
                        Icon={MdLogin}
                        onClick={() => navigate('/')}
                        className={styles.backButton}
                    >
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Button>

                </form>
            </div>
        </div>
    );
};

export default Registration;
