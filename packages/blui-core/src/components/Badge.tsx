import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { registerComponentTheme, getComponentTheme } from '../theme/registry';
import { useTheme } from '../theme';
import { defaultBadgeTheme, type BadgeTheme } from './Badge/theme';

// Register the badge theme when the module loads
registerComponentTheme('badge', defaultBadgeTheme);

/**
 * Props for the Badge component.
 * 
 * Extends standard HTML span attributes with theme-aware styling options.
 * The Badge component provides a compact way to display status, counts,
 * or categorical information with consistent semantic coloring.
 * 
 * @example
 * ```tsx
 * // Basic usage with type-safe variants
 * import { Badge, ComponentVariant, ComponentSize } from '@/components';
 * 
 * <Badge variant={ComponentVariant.Success} size={ComponentSize.Medium}>
 *   Active
 * </Badge>
 * 
 * // Outlined badge with custom content
 * <Badge 
 *   variant={ComponentVariant.Primary}
 *   size={ComponentSize.Small}
 *   outline
 * >
 *   <Icon name="star" /> Featured
 * </Badge>
 * 
 * // Using string literals (also supported)
 * <Badge variant="warning" size="lg">
 *   Warning
 * </Badge>
 * ```
 * 
 * @since 1.0.0
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 
   * Visual variant of the badge that determines its color scheme and semantic meaning.
   * 
   * - `primary`: Primary brand color for important information
   * - `secondary`: Secondary color for neutral information
   * - `success`: Green color for positive states and confirmations
   * - `warning`: Orange/yellow color for cautionary information
   * - `error`: Red color for errors and critical states
   * 
   * @default ComponentVariant.Primary
   * @example
   * ```tsx
   * <Badge variant={ComponentVariant.Success}>Success</Badge>
   * <Badge variant={ComponentVariant.Error}>Error</Badge>
   * ```
   * @since 1.0.0
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  
  /** 
   * Size of the badge that affects padding, font size, and overall dimensions.
   * 
   * - `sm`: Small badge for compact layouts and inline use
   * - `md`: Medium badge for standard use (default)
   * - `lg`: Large badge for prominent display
   * 
   * @default ComponentSize.Medium
   * @example
   * ```tsx
   * <Badge size={ComponentSize.Small}>Small</Badge>
   * <Badge size={ComponentSize.Large}>Large</Badge>
   * ```
   * @since 1.0.0
   */
  size?: 'sm' | 'md' | 'lg';
  
  /** 
   * Whether to use outline style instead of filled background.
   * When true, the badge will have a transparent background with
   * a colored border and text instead of a filled appearance.
   * 
   * @default false
   * @example
   * ```tsx
   * <Badge outline variant={ComponentVariant.Primary}>
   *   Outlined badge
   * </Badge>
   * ```
   * @since 1.0.0
   */
  outline?: boolean;
}

/**
 * A themeable badge component for displaying status, categories, or counts.
 * Automatically integrates with the global theme system and respects theme updates.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Badge variant="primary">New</Badge>
 * 
 * // Success status
 * <Badge variant="success">Active</Badge>
 * 
 * // Outline style
 * <Badge variant="error" outline>Inactive</Badge>
 * 
 * // Different sizes
 * <Badge variant="warning" size="sm">Small</Badge>
 * <Badge variant="info" size="lg">Large</Badge>
 * 
 * // With custom content
 * <Badge variant="primary">
 *   <Icon name="star" /> Featured
 * </Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      outline = false,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();
    const badgeTheme = getComponentTheme<BadgeTheme>(theme, 'badge');

    const variantStyles = badgeTheme.colors[variant];
    const sizeStyles = badgeTheme.sizes[size];

    const badgeStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: outline ? 'transparent' : variantStyles.background,
      color: variantStyles.text,
      border: `1px solid ${variantStyles.border}`,
      borderRadius: badgeTheme.borderRadius,
      fontSize: sizeStyles.fontSize,
      fontWeight: badgeTheme.fontWeight,
      height: sizeStyles.height,
      padding: sizeStyles.padding,
      whiteSpace: 'nowrap',
      userSelect: 'none',
      ...style,
    };

    return (
      <span
        ref={ref}
        className={className}
        style={badgeStyles}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
