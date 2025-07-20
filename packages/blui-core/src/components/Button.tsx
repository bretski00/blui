import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../theme';
import { registerComponentTheme, getComponentTheme } from '../theme/registry';
import { defaultButtonTheme, type ButtonTheme } from './Button/theme';
import { ButtonVariant, ComponentSize } from '../contracts';

// Register the button theme when the module loads
registerComponentTheme('button', defaultButtonTheme);

// Minor update for v1.0.1 testing

/**
 * Props for the Button component.
 * 
 * Extends standard HTML button attributes with theme-aware styling options.
 * The Button component provides a consistent, accessible, and themeable button
 * implementation with multiple variants, sizes, and states.
 * 
 * @example
 * ```tsx
 * // Basic usage with type-safe variants
 * import { Button, ButtonVariant, ComponentSize } from '@/components';
 * 
 * <Button variant={ButtonVariant.Primary} size={ComponentSize.Large}>
 *   Primary Button
 * </Button>
 * 
 * // With icons and loading state
 * <Button 
 *   variant={ButtonVariant.Outline}
 *   size={ComponentSize.Medium}
 *   leftIcon={<PlusIcon />}
 *   isLoading={isSubmitting}
 *   onClick={handleSubmit}
 * >
 *   Add Item
 * </Button>
 * 
 * // Using string literals (also supported)
 * <Button variant="ghost" size="sm">
 *   Ghost Button
 * </Button>
 * ```
 * 
 * @since 1.0.0
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 
   * Visual variant of the button that determines its appearance and semantic meaning.
   * 
   * - `primary`: Solid primary button with brand colors (default)
   * - `secondary`: Solid secondary button with muted colors  
   * - `outline`: Outlined button with transparent background
   * - `ghost`: Minimal button with no background or border
   * 
   * @default ButtonVariant.Primary
   * @example
   * ```tsx
   * <Button variant={ButtonVariant.Primary}>Primary</Button>
   * <Button variant={ButtonVariant.Outline}>Outline</Button>
   * ```
   * @since 1.0.0
   */
  variant?: ButtonVariant | 'primary' | 'secondary' | 'outline' | 'ghost';
  
  /** 
   * Size of the button that affects padding, font size, and overall dimensions.
   * 
   * - `sm`: Small button for compact layouts
   * - `md`: Medium button for standard use (default)
   * - `lg`: Large button for prominent actions
   * 
   * @default ComponentSize.Medium
   * @example
   * ```tsx
   * <Button size={ComponentSize.Small}>Small</Button>
   * <Button size={ComponentSize.Large}>Large</Button>
   * ```
   * @since 1.0.0
   */
  size?: ComponentSize | 'sm' | 'md' | 'lg';
  
  /** 
   * Shows loading state with disabled interaction and optional loading indicator.
   * When true, the button becomes non-interactive and can display a loading spinner.
   * 
   * @default false
   * @example
   * ```tsx
   * <Button isLoading={isSubmitting}>
   *   {isSubmitting ? 'Saving...' : 'Save'}
   * </Button>
   * ```
   * @since 1.0.0
   */
  isLoading?: boolean;
  
  /** 
   * Icon or element to display on the left side of the button text.
   * Automatically handles spacing and alignment with the button content.
   * 
   * @example
   * ```tsx
   * <Button leftIcon={<PlusIcon />}>Add Item</Button>
   * <Button leftIcon={<Icon name="save" />}>Save</Button>
   * ```
   * @since 1.0.0
   */
  leftIcon?: React.ReactNode;
  
  /** 
   * Icon or element to display on the right side of the button text.
   * Commonly used for dropdown indicators or action confirmations.
   * 
   * @example
   * ```tsx
   * <Button rightIcon={<ChevronDownIcon />}>More Options</Button>
   * <Button rightIcon={<ArrowRightIcon />}>Continue</Button>
   * ```
   * @since 1.0.0
   */
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
        type="button"
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
