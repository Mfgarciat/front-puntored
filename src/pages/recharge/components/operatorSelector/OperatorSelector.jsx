import styles from './OperatorSelector.module.css';

const OperatorSelector = ({ operators, value, onChange, loading = false }) => {
  const handleOperatorChange = (e) => {
    const selectedId = e.target.value;
    onChange(selectedId);
  };

  return (
    <div className={styles.operatorSelector}>
      <label htmlFor="operator-select" className={styles.label}>
        Operador Móvil
      </label>
      
      {loading ? (
        <div className={styles.loading}>Cargando operadores...</div>
      ) : (
        <select
          id="operator-select"
          value={value}
          onChange={handleOperatorChange}
          className={styles.select}
          required
        >
          <option value="">Seleccione un operador</option>
          {operators.map((operator) => (
            <option key={operator.id} value={operator.id}>
              {operator.name}
            </option>
          ))}
        </select>
      )}
      
    </div>
  );
};

export default OperatorSelector;