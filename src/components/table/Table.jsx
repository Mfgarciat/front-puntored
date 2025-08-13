import styles from './Table.module.css';

const Table = ({
  columns = [],
  data = [],
  keyField = 'id',
  onRowClick = null,
  className = '',
  headerClassName = '',
  rowClassName = '',
  cellClassName = '',
  emptyMessage = 'No hay datos disponibles'
}) => {
  return (
    <table className={`${styles.historyTable} ${className}`}>
      <thead className={headerClassName}>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr 
              key={item[keyField]} 
              className={`${rowClassName} ${onRowClick ? styles.clickableRow : ''}`}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column) => (
                <td key={column.key} className={cellClassName}>
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;