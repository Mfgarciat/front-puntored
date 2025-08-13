import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import styles from './NoDataMessage.module.css';
import { useNavigate } from 'react-router-dom';


const NoDataMessage = ({ message = "No se encontró información disponible" }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.content}>
            <div className={styles.contentElements}>
                <button 
                type="button" 
                className={styles.backButton} 
                onClick={() => navigate(-1)}
                >
                ← Regresar
                </button>
                <div className={styles.contentNoData}>
                    <div className={styles.iconWrapper}>
                        <MdInfoOutline size={40} />
                    </div>
                    <p className={styles.noData}>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default NoDataMessage;
