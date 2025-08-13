import React from 'react';
import styles from './RechargeTicket.module.css';
import CurrencyFormatter from '../../../../components/CurrencyFormatter';

const RechargeTicket = ({ ticket }) => {
 
  return (
    <div className={styles.ticket}>
      <div className={styles.header}>
        <h3>Comprobante de Recarga</h3>
        <p>N° {ticket.id}</p>
      </div>

      <div className={styles.details}>
        <div className={styles.row}>
          <span>Operador:</span>
          <span>{ticket.supplier}</span>
        </div>
        <div className={styles.row}>
          <span>Teléfono:</span>
          <span>{ticket.phoneNumber}</span>
        </div>
        <div className={styles.row}>
          <span>Valor de Recarga:</span>
          <span>{CurrencyFormatter(ticket.value)}</span>
        </div>
        <div className={styles.row}>
          <span>Fecha:</span>
          <span>{new Date(ticket.date).toLocaleString()}</span>
        </div>
      </div>

      <div className={styles.footer}>
  
        <small>Gracias por su compra</small>
      </div>
    </div>
  );
};

export default RechargeTicket;