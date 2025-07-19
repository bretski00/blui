import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { registerComponentTheme, getComponentTheme } from '../theme/registry';
import { useTheme } from '../theme';
import { defaultBadgeTheme, type BadgeTheme } from './Badge/theme';

// Register the badge theme when the module loads
registerComponentTheme('badge', defaultBadgeTheme);

/**
 * Props for the Badge component.
 * Extends standard HTML span attributes with theme-aware styling options.
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 
   * Visual variant of the badge
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** 
   * Size of the badge 
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /** 
   * Whether to use outline style instead of filled
   * @default false
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
