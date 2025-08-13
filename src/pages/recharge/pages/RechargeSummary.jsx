import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RechargeTicket from '../components/rechargeTicket/RechargeTicket';
import styles from '../styles/Recharge.module.css';
import { useNavigate } from 'react-router-dom';
import NoDataMessage from '../../../components/noDataMessage/NoDataMessage';
import { MdPrint } from "react-icons/md";
import Button from '../../../components/button/Button';

const RechargeSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ticket = state?.ticket;
  const operators = state?.operators;


  if (!ticket) {
    return <NoDataMessage message="No se encontró información de la recarga" />;
  }

  const supliers = operators.find(op => op.id === ticket.supplierId).name;

  return (
    <div className={styles.containerRecharge}>
      <div className={styles.summaryContainer}>
        <Button
          type="button"
          className={styles.backButton}
          onClick={() => navigate('/recharge/history')}
          width={'auto'}
        >
          ← Regresar
        </Button>
    
        <h2>Recarga Exitosa</h2>
        <p className={styles.successMessage}>¡Tu recarga se ha procesado correctamente!</p>

        <div className={styles.ticketContainer}>
          <RechargeTicket ticket={{ ...ticket, supplier: supliers }} />
        </div>

        <div className={styles.actions}>
          <button onClick={() => window.print()} className={styles.printButton}>
            <MdPrint className={styles.icon} />Imprimir Ticket
          </button>

        </div>
      </div>
    </div>
  );
};

export default RechargeSummary;