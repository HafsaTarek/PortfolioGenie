import styles from './Button.module.css';

/**
 * Reusable Button.
 * variant: 'primary' (solid gradient) | 'outline' (purple outline) | 'ghost' (text link style) | 'icon' (icon-only, circular)
 * size: 'sm' | 'md'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'left',
  className = '',
  as: Component = 'button',
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    icon && !children ? styles.iconOnly : '',
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
