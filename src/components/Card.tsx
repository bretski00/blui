import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { registerComponentTheme, getComponentTheme } from '../theme/registry';
import { useTheme } from '../theme';
import { defaultCardTheme, type CardTheme } from './Card/theme';

// Register the card theme when the module loads
registerComponentTheme('card', defaultCardTheme);

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      padding = 'md',
      hoverable = false,
      className = '',
      style,
      children,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const cardTheme = getComponentTheme<CardTheme>(theme, 'card');
    const [isHovered, setIsHovered] = React.useState(false);

    const getVariantStyles = () => {
      switch (variant) {
        case 'outlined':
          return {
            backgroundColor: cardTheme.background,
            border: `1px solid ${cardTheme.border}`,
            boxShadow: 'none',
          };
        case 'filled':
          return {
            backgroundColor: cardTheme.background,
            border: 'none',
            boxShadow: 'none',
          };
        case 'elevated':
        default:
          return {
            backgroundColor: cardTheme.background,
            border: 'none',
            boxShadow: cardTheme.shadow,
          };
      }
    };

    const getPadding = () => {
      if (padding === 'none') return '0';
      return cardTheme.padding[padding];
    };

    const cardStyles: React.CSSProperties = {
      borderRadius: cardTheme.borderRadius,
      padding: getPadding(),
      transition: 'all 0.2s ease-in-out',
      position: 'relative',
      ...getVariantStyles(),
      ...(hoverable && isHovered && {
        transform: 'translateY(-2px)',
        boxShadow: variant === 'elevated' ? '0 8px 25px -8px rgba(0, 0, 0, 0.15)' : cardTheme.shadow,
      }),
      ...style,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverable) {
        setIsHovered(true);
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverable) {
        setIsHovered(false);
      }
      onMouseLeave?.(e);
    };

    return (
      <div
        ref={ref}
        className={className}
        style={cardStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
