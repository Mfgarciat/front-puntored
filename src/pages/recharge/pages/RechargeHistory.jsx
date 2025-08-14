import { useEffect, useState } from 'react';
import { getTransactionHistory,getSuppliers } from '../../../api/rechargeService';
import styles from '../styles/Recharge.module.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/loader/Loader';
import CurrencyFormatter from '../../../components/CurrencyFormatter';
import { MdAdd } from "react-icons/md";
import NoDataMessage from '../../../components/noDataMessage/NoDataMessage';
import Input from '../../../components/input/Input';
import Table from '../../../components/table/Table';
import Button from '../../../components/button/Button';

const RechargeHistory = () => {
  const [searchValue, setSearchValue] = useState('');
  const [itemSelected, setItemSelected] = useState({});
  const [operators, setOperators] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [transactionsCopy, setTransactionsCopy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const data = await getTransactionHistory();
        const operators = await getSuppliers();
        setOperators(operators);
        setTransactions(data);
        setTransactionsCopy(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (value.trim() === '') {
      // Si no hay texto, restaurar la lista original
      setTransactions(transactionsCopy);
    } else {
      // Filtrar por número o por operador
      const filtered = transactionsCopy.filter((tx) => {
        const phoneMatch = tx.phoneNumber?.toLowerCase().includes(value);
        const supplierMatch = tx.supplierId?.toLowerCase().includes(value);
        return phoneMatch || supplierMatch;
      });
      setTransactions(filtered);
    }
  };

  const handleViewDetails = (transaction) => {
    navigate('/recharge/summary', { state: { ticket: transaction, operators: operators } });
  }

  const transactionColumns = [
    {
      key: 'date',
      title: 'Fecha',
      render: (tx) => new Date(tx.date).toLocaleDateString()
    },
    {
      key: 'supplierId',
      title: 'Id Operador',
    },
    {
      key: 'supplierName',
      title: 'Operador',
      render: (tx) => (operators ? operators.find(op => tx.supplierId === op.id).name : tx.supplierId) 
    },
    {
      key: 'phoneNumber',
      title: 'Celular'
    },
    {
      key: 'value',
      title: 'Valor',
      render: (tx) => CurrencyFormatter(tx.value)
    },
    {
      key: 'actions',
      title: 'Acciones',
      render: (tx) => (


        <Button
         onClick={() => handleViewDetails(tx)}
          width={'auto'}
          className={styles.viewButton}
        >
          Ver
        </Button>
      
      )
    }
  ];

  if (loading) {
    return <Loader />
  }


  if (error) {
    return <NoDataMessage message="No hay datos disponibles" />
  }


  return (
    <div className={styles.containerRecharge}>
      <div className={styles.historyContainer}>
        <h2>Historial de Recargas</h2>
        <Input
          id="searchValue"
          type="searchValue"
          placeholder="Buscar por número o operador"
          value={searchValue}
          width={"15rem"}
          onChange={handleFilterChange}
          className={styles.filterControls}
          required
        />
        <Table
          columns={transactionColumns}
          data={transactions}
          keyField="id"
          onRowClick={(tx) => console.log('Ver detalles de:', tx)}
          className={styles.historyTable}
        />
        <div className={styles.contentDetails}>
          <Button
            type="button"
            onClick={() => navigate('/recharge/new')}
            className={styles.detailButton}
            Icon={MdAdd}
            width={'100%'}
          >
            Nueva Recarga
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RechargeHistory;