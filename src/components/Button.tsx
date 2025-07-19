import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../theme';
import { registerComponentTheme, getComponentTheme } from '../theme/registry';
import { defaultButtonTheme, type ButtonTheme } from './Button/theme';

// Register the button theme when the module loads
registerComponentTheme('button', defaultButtonTheme);

/**
 * Props for the Button component.
 * Extends standard HTML button attributes with theme-aware styling options.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** 
   * Size of the button 
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /** 
   * Shows loading state with disabled interaction
   * @default false
   */
  isLoading?: boolean;
  /** Icon to display on the left side of the button text */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side of the button text */
  rightIcon?: React.ReactNode;
}

/**
 * A themeable button component with multiple variants and sizes.
 * Automatically integrates with the global theme system and respects theme updates.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * 
 * // With icons
 * <Button leftIcon={<PlusIcon />} variant="outline">
 *   Add Item
 * </Button>
 * 
 * // Loading state
 * <Button isLoading variant="primary">
 *   Save
 * </Button>
 * 
 * // Custom styling (will be preserved during hover/focus)
 * <Button style={{ backgroundColor: '#ff0000' }} variant="primary">
 *   Custom Red
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const buttonTheme = getComponentTheme<ButtonTheme>(theme, 'button');

    const variantStyles = buttonTheme.colors[variant];
    const sizeStyles = buttonTheme.sizes[size];

    const buttonStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      border: `1px solid ${variantStyles.border}`,
      borderRadius: buttonTheme.borderRadius,
      backgroundColor: variantStyles.background,
      color: variantStyles.text,
      fontSize: sizeStyles.fontSize,
      fontWeight: buttonTheme.fontWeight,
      height: sizeStyles.height,
      padding: sizeStyles.padding,
      transition: buttonTheme.transition,
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: disabled || isLoading ? 0.6 : 1,
      outline: 'none',
      textDecoration: 'none',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      ...style,
    };

    return (
      <button
        ref={ref}
        className={className}
        style={buttonStyles}
        disabled={disabled || isLoading}
        onMouseEnter={(e) => {
          if (!disabled && !isLoading) {
            // Only apply theme hover if no inline backgroundColor is set
            if (!style?.backgroundColor) {
              const currentButtonTheme = getComponentTheme<ButtonTheme>(theme, 'button');
              const currentVariantStyles = currentButtonTheme.colors[variant];
              e.currentTarget.style.backgroundColor = currentVariantStyles.backgroundHover;
            }
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !isLoading) {
            // Only apply theme background if no inline backgroundColor is set
            if (!style?.backgroundColor) {
              const currentButtonTheme = getComponentTheme<ButtonTheme>(theme, 'button');
              const currentVariantStyles = currentButtonTheme.colors[variant];
              e.currentTarget.style.backgroundColor = currentVariantStyles.background;
            }
          }
        }}
        onMouseDown={(e) => {
          if (!disabled && !isLoading) {
            // Only apply theme active if no inline backgroundColor is set
            if (!style?.backgroundColor) {
              const currentButtonTheme = getComponentTheme<ButtonTheme>(theme, 'button');
              const currentVariantStyles = currentButtonTheme.colors[variant];
              e.currentTarget.style.backgroundColor = currentVariantStyles.backgroundActive;
            }
          }
        }}
        onMouseUp={(e) => {
          if (!disabled && !isLoading) {
            // Only apply theme hover if no inline backgroundColor is set
            if (!style?.backgroundColor) {
              const currentButtonTheme = getComponentTheme<ButtonTheme>(theme, 'button');
              const currentVariantStyles = currentButtonTheme.colors[variant];
              e.currentTarget.style.backgroundColor = currentVariantStyles.backgroundHover;
            }
          }
        }}
        {...props}
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            {leftIcon && <span>{leftIcon}</span>}
            {children}
            {rightIcon && <span>{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
