import styles from './Button.module.css';

/**
 * Reusable Button.
 * variant: 'primary' | 'outline' | 'ghost' | 'icon'
 * size: 'sm' | 'md' | 'medium' (تمت إضافة الدعم للحجم الجديد)
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'left',
  fullWidth = false, // الميزة الجديدة التي تم نقلها
  className = '',
  as: Component = 'button',
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    icon && !children ? styles.iconOnly : '',
    fullWidth ? styles.fullWidth : '', // إضافة كلاس العرض الكامل ديناميكيًا
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...rest}>
      {icon && iconPosition === 'left' && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      
      {children && <span className={styles.label}>{children}</span>}
      
      {icon && iconPosition === 'right' && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
    </Component>
  );
}