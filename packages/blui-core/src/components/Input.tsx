import React, { forwardRef, useState, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { registerComponentTheme, getComponentTheme } from '../theme/registry';
import { useTheme } from '../theme';
import { defaultInputTheme, type InputTheme } from './Input/theme';
import { ComponentSize } from '../contracts';

// Register the input theme when the module loads
registerComponentTheme('input', defaultInputTheme);

/**
 * Props for the Input component.
 * 
 * Extends standard HTML input attributes with theme-aware styling options.
 * The Input component provides a consistent, accessible, and feature-rich
 * text input with validation states, icons, and helper text support.
 * 
 * @example
 * ```tsx
 * // Basic usage with type-safe size
 * import { Input, ComponentSize } from '@/components';
 * 
 * <Input 
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 *   size={ComponentSize.Medium}
 * />
 * 
 * // Input with validation and helper text
 * <Input
 *   label="Password"
 *   type="password"
 *   size={ComponentSize.Large}
 *   error={hasPasswordError}
 *   helperText={hasPasswordError ? "Password is required" : "Must be at least 8 characters"}
 *   leftIcon={<LockIcon />}
 * />
 * 
 * // Input with icons and custom styling
 * <Input
 *   label="Search"
 *   placeholder="Search products..."
 *   size={ComponentSize.Small}
 *   leftIcon={<SearchIcon />}
 *   rightIcon={<ClearIcon onClick={clearSearch} />}
 * />
 * 
 * // Using string literals (also supported)
 * <Input 
 *   label="Username"
 *   size="md"
 *   error={false}
 * />
 * ```
 * 
 * @since 1.0.0
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 
   * Size of the input that affects padding, font size, and overall dimensions.
   * 
   * - `sm`: Small input for compact layouts and forms
   * - `md`: Medium input for standard use (default)
   * - `lg`: Large input for prominent or accessible forms
   * 
   * @default ComponentSize.Medium
   * @example
   * ```tsx
   * <Input size={ComponentSize.Small} />
   * <Input size={ComponentSize.Large} />
   * ```
   * @since 1.0.0
   */
  size?: ComponentSize | 'sm' | 'md' | 'lg';
  
  /** 
   * Error state that changes the input's visual appearance to indicate validation issues.
   * When true, the input will display error styling (red border, error colors)
   * and should be paired with descriptive helperText.
   * 
   * @default false
   * @example
   * ```tsx
   * <Input 
   *   error={!isValid}
   *   helperText={!isValid ? "This field is required" : ""}
   * />
   * ```
   * @since 1.0.0
   */
  error?: boolean;
  
  /** 
   * Descriptive text displayed below the input to provide additional context,
   * validation feedback, or usage instructions. Color and styling automatically
   * adapt based on the error state.
   * 
   * @example
   * ```tsx
   * <Input 
   *   helperText="We'll never share your email with anyone else."
   * />
   * <Input 
   *   error={true}
   *   helperText="Please enter a valid email address."
   * />
   * ```
   * @since 1.0.0
   */
  helperText?: string;
  
  /** 
   * Label text displayed above the input for accessibility and user guidance.
   * Creates a proper label-input association for screen readers and enables
   * click-to-focus behavior on the label.
   * 
   * @example
   * ```tsx
   * <Input label="Full Name" placeholder="Enter your name" />
   * <Input label="Email Address" type="email" />
   * ```
   * @since 1.0.0
   */
  label?: string;
  
  /** 
   * Icon or element displayed on the left side of the input field.
   * Commonly used for contextual icons like search, user, or lock icons.
   * Automatically handles spacing and alignment.
   * 
   * @example
   * ```tsx
   * <Input leftIcon={<UserIcon />} placeholder="Username" />
   * <Input leftIcon={<SearchIcon />} placeholder="Search..." />
   * ```
   * @since 1.0.0
   */
  leftIcon?: React.ReactNode;
  
  /** 
   * Icon or element displayed on the right side of the input field.
   * Often used for action buttons like clear, visibility toggle, or submit.
   * Can be interactive elements that respond to user actions.
   * 
   * @example
   * ```tsx
   * <Input 
   *   type="password" 
   *   rightIcon={<EyeIcon onClick={toggleVisibility} />}
   * />
   * <Input 
   *   rightIcon={<ClearIcon onClick={clearInput} />}
   * />
   * ```
   * @since 1.0.0
   */
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      error = false,
      helperText,
      label,
      leftIcon,
      rightIcon,
      className = '',
      style,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const { theme } = useTheme();
    const inputTheme = getComponentTheme<InputTheme>(theme, 'input');
    const inputId = useId();

    const sizeStyles = inputTheme.sizes[size];
    const colors = inputTheme.colors;

    const getBorderColor = () => {
      if (error) return colors.borderError;
      if (isFocused) return colors.borderFocus;
      return colors.border;
    };

    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    };

    const labelStyles: React.CSSProperties = {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: colors.text,
      marginBottom: '0.25rem',
    };

    const inputWrapperStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    };

    const inputStyles: React.CSSProperties = {
      width: '100%',
      height: sizeStyles.height,
      padding: leftIcon || rightIcon ? '0 2.5rem' : sizeStyles.padding,
      fontSize: sizeStyles.fontSize,
      color: colors.text,
      backgroundColor: colors.background,
      border: `1px solid ${getBorderColor()}`,
      borderRadius: inputTheme.borderRadius,
      transition: inputTheme.transition,
      outline: 'none',
      ...style,
    };

    const iconStyles: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      color: colors.placeholder,
      pointerEvents: 'none',
      zIndex: 1,
    };

    const leftIconStyles: React.CSSProperties = {
      ...iconStyles,
      left: '0.75rem',
    };

    const rightIconStyles: React.CSSProperties = {
      ...iconStyles,
      right: '0.75rem',
    };

    const helperTextStyles: React.CSSProperties = {
      fontSize: '0.75rem',
      color: error ? colors.borderError : colors.placeholder,
      marginTop: '0.25rem',
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div style={containerStyles} className={className}>
        {label && <label htmlFor={inputId} style={labelStyles}>{label}</label>}
        <div style={inputWrapperStyles}>
          {leftIcon && <span style={leftIconStyles}>{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            style={inputStyles}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {rightIcon && <span style={rightIconStyles}>{rightIcon}</span>}
        </div>
        {helperText && <span style={helperTextStyles}>{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
