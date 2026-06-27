import styles from './Card.module.css';

export default function Card({ children, className = '', as: Component = 'div', ...rest }) {
  return (
    <Component className={`${styles.card} ${className}`} {...rest}>
      {children}
    </Component>
  );
}