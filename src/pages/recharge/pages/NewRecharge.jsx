import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSuppliers, processRecharge } from '../../../api/rechargeService';
import OperatorSelector from '../components/operatorSelector/OperatorSelector';
import styles from '../styles/Recharge.module.css';
import Loader from '../../../components/loader/Loader';
import { MdSave } from "react-icons/md";
import Input from "../../../components/input/Input.jsx";
import Button from '../../../components/button/Button';



const NewRecharge = () => {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        phoneNumber: '',
        value: '',
        supplierId: ''
    });
    const [operators, setOperators] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadOperators = async () => {
            try {
                setLoading(true);
                const data = await getSuppliers();
                setOperators(data);
                setLoading(false);
                setShowForm(true);
            } catch (error) {
                console.error('Error loading operators:', error);
            }
        };
        loadOperators();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        if (name === 'phoneNumber') {
            const phoneRegex = /^3\d{9}$/;
            if (!phoneRegex.test(value) && value.length > 0) {
                setError('El número debe iniciar en "3" y tener 10 dígitos.');
            } else {
                setError(null);
            }
        } else if (name === 'value') {
            const transactionValue = parseFloat(value);
            if ((transactionValue < 1000 || transactionValue > 100000) && value.length > 0) {
                setError('El monto debe estar entre 1,000 y 100,000.');
            } else {
                setError(null);
            }
        } else if (name === 'supplierId') {
            if (!value) {
                setError('Debes seleccionar un operador.');
            } else {
                setError(null);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^3\d{9}$/;
        const transactionValue = parseFloat(formData.value);

        if (!phoneRegex.test(formData.phoneNumber) || transactionValue < 1000 || transactionValue > 100000 || !formData.supplierId) {
            setError('Por favor, revisa todos los campos del formulario.');
            return;
        }

        setLoading(true);
        try {
            const result = await processRecharge(formData);
            console.log("result", result)
            navigate('/recharge/summary', { state: { ticket: result, operators: operators } });
        } catch (apiError) {
            setError(apiError.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader/>;
    }


    return (
        <div className={styles.containerRecharge}>
            <div className={styles.container}>
                <Button
                    type="button"
                    className={styles.backButton}
                    onClick={() => navigate(-1)}
                    width={'auto'}
                >
                    ← Regresar
                </Button>
                <h2 className={styles.typingText}>Nueva Recarga Móvil</h2>
                <form onSubmit={handleSubmit} className={`${styles.form} ${showForm ? styles.visible : styles.hidden}`}>
                    <Input
                        id="phoneNumber"
                        type="number"
                        label="Número de teléfono"
                        value={formData.phoneNumber}
                        placeholder="Ej: 3001234567"
                        maxLength="10"
                        onChange={handleChange}
                        required
                    />
                    <Input
                        id="value"
                        type="number"
                        label="Monto"
                        value={formData.value}
                        placeholder="Ej: 5000"
                        min="1000"
                        max="100000"
                        maxLength="6"
                        step="1"
                        onChange={handleChange}
                        required
                    />
                    <div className={`${showForm ? styles.visible : styles.hidden}`} style={{ transitionDelay: '2.7s' }}>
                        <OperatorSelector
                            operators={operators}
                            value={formData.supplierId}
                            onChange={(id) => setFormData(prevFormData => ({
                                ...prevFormData,
                                supplierId: id
                            }))}
                        />
                    </div>
                    {error && (
                        <div className={`${styles.errorMessage} ${showForm ? styles.visible : styles.hidden}`}>
                            {error}
                        </div>
                    )}
                    <Button
                        type="submit"
                        className={styles.detailButton}
                        Icon={MdSave}
                        disabled={loading}
                        width={'100%'}
                    >
                        {loading ? 'Procesando...' : 'Realizar Recarga'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default NewRecharge;