import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { registerComponentTheme, getComponentTheme } from '../theme/registry';
import { useTheme } from '../theme';
import { defaultCardTheme, type CardTheme } from './Card/theme';
import { CardVariant, CardPadding } from '../contracts';

// Register the card theme when the module loads
registerComponentTheme('card', defaultCardTheme);

/**
 * Props for the Card component.
 * 
 * Extends standard HTML div attributes with theme-aware styling options.
 * The Card component provides a flexible container with consistent styling,
 * elevation, and responsive behavior across different variants.
 * 
 * @example
 * ```tsx
 * // Basic usage with type-safe variants
 * import { Card, CardVariant, CardPadding } from '@/components';
 * 
 * <Card variant={CardVariant.Elevated} padding={CardPadding.Large}>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 * 
 * // Interactive card with hover effects
 * <Card 
 *   variant={CardVariant.Outlined}
 *   padding={CardPadding.Medium}
 *   hoverable
 *   onClick={handleCardClick}
 * >
 *   <div>Interactive content</div>
 * </Card>
 * 
 * // Using string literals (also supported)
 * <Card variant="filled" padding="sm">
 *   Compact card
 * </Card>
 * ```
 * 
 * @since 1.0.0
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** 
   * Visual variant of the card that determines its appearance and elevation.
   * 
   * - `elevated`: Card with shadow elevation for depth
   * - `outlined`: Card with border outline and no shadow
   * - `filled`: Card with subtle background fill
   * 
   * @default CardVariant.Elevated
   * @example
   * ```tsx
   * <Card variant={CardVariant.Elevated}>Elevated card</Card>
   * <Card variant={CardVariant.Outlined}>Outlined card</Card>
   * ```
   * @since 1.0.0
   */
  variant?: CardVariant | 'elevated' | 'outlined' | 'filled';
  
  /** 
   * Internal padding of the card content area.
   * 
   * - `none`: No internal padding
   * - `sm`: Small padding for compact content
   * - `md`: Medium padding for standard content (default)
   * - `lg`: Large padding for spacious layouts
   * 
   * @default CardPadding.Medium
   * @example
   * ```tsx
   * <Card padding={CardPadding.Large}>Spacious content</Card>
   * <Card padding={CardPadding.None}>No padding</Card>
   * ```
   * @since 1.0.0
   */
  padding?: CardPadding | 'sm' | 'md' | 'lg' | 'none';
  
  /** 
   * Enables hover effects and interactive styling.
   * When true, the card will respond to mouse hover with visual feedback
   * such as elevation changes or color transitions.
   * 
   * @default false
   * @example
   * ```tsx
   * <Card hoverable onClick={handleClick}>
   *   Interactive card content
   * </Card>
   * ```
   * @since 1.0.0
   */
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
