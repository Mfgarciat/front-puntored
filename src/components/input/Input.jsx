
import styles from './Input.module.css';

const Input = ({
                   id,
                   type = 'text',
                   label = '',
                   value,
                   width = '-webkit-fill-available',
                   min = "",
                   max = "",
                   maxLength = "",
                   step="",
                   onChange,
                   placeholder = '',
                   required = false,
                   className = '',
                   inputClassName = '',
               }) => {
    return (
        <div className={`${styles.spacing} ${className}`}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}

            <input
                id={id}
                name={id}
                type={type}
                required={required}
                className={`${styles.inputField} ${inputClassName}`}
                style={{width: width}}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                maxLength={maxLength}
                max={max}
                step={step}
            />
        </div>
    );
};

export default Input;