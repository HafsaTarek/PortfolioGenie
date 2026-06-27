import styles from './Field.module.css';

export default function Field({
  id,
  label,
  as = 'input',
  hint,
  hintRight,
  className = '',
  ...rest
}) {
  const Control = as === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <Control
        id={id}
        className={as === 'textarea' ? styles.textarea : styles.input}
        {...rest}
      />
      {(hint || hintRight) && (
        <div className={styles.hintRow}>
          <span className={styles.hint}>{hint}</span>
          <span className={styles.hint}>{hintRight}</span>
        </div>
      )}
    </div>
  );
}