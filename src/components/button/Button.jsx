import styles from './Button.module.css';

const Button = ({ 
  type = 'button',
  children, 
  onClick, 
  disabled = false,
  Icon = null,
  width = '100%',
  className = ''
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.submitButton} ${className}`}
      style={{ width: width }}
      onClick={onClick}
    >
      {Icon && <Icon className={styles.icon} />}
      {children}
    </button>
  );
};

export default Button;