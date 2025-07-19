import React, { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { registerComponentTheme, getComponentTheme } from '../theme/registry';
import { useTheme } from '../theme';
import { defaultInputTheme, type InputTheme } from './Input/theme';

// Register the input theme when the module loads
registerComponentTheme('input', defaultInputTheme);

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  helperText?: string;
  label?: string;
  leftIcon?: React.ReactNode;
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
        {label && <label style={labelStyles}>{label}</label>}
        <div style={inputWrapperStyles}>
          {leftIcon && <span style={leftIconStyles}>{leftIcon}</span>}
          <input
            ref={ref}
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
