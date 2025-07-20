import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { useTypography, useColors } from '../theme';
import { TextSize, TextWeight, TextColor, TextAlign, TextElement } from '../contracts';

/**
 * Props for the Text component.
 * 
 * Extends standard HTML element attributes with comprehensive typography options.
 * The Text component provides a flexible, semantic, and theme-aware way to render
 * text content with consistent styling across the application.
 * 
 * @example
 * ```tsx
 * // Basic usage with type-safe options
 * import { Text, TextSize, TextWeight, TextColor } from '@/components';
 * 
 * <Text 
 *   as={TextElement.Heading1} 
 *   size={TextSize.ExtraLarge4} 
 *   weight={TextWeight.Bold}
 *   color={TextColor.Primary}
 * >
 *   Main Page Title
 * </Text>
 * 
 * // Body text with semantic colors
 * <Text 
 *   size={TextSize.Base}
 *   color={TextColor.Secondary}
 *   lineHeight="relaxed"
 * >
 *   This is body text with relaxed line height for better readability.
 * </Text>
 * 
 * // Truncated text with fixed width
 * <Text 
 *   truncate 
 *   style={{ maxWidth: '200px' }}
 *   size={TextSize.Small}
 * >
 *   This text will be truncated if it exceeds the maximum width
 * </Text>
 * 
 * // Using string literals (also supported)
 * <Text as="h2" size="xl" weight="semibold">
 *   Section Heading
 * </Text>
 * ```
 * 
 * @since 1.0.0
 */
export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** 
   * HTML element type to render for semantic correctness and accessibility.
   * 
   * - `p`: Paragraph element for body text (default)
   * - `span`: Inline element for short text
   * - `div`: Block element for flexible layouts
   * - `h1`-`h6`: Heading elements for hierarchical content structure
   * 
   * @default TextElement.Paragraph
   * @example
   * ```tsx
   * <Text as={TextElement.Heading1}>Main Title</Text>
   * <Text as={TextElement.Paragraph}>Body content</Text>
   * <Text as={TextElement.Span}>Inline text</Text>
   * ```
   * @since 1.0.0
   */
  as?: TextElement | 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  /** 
   * Font size following the design system's typographic scale.
   * 
   * - `xs`: Extra small (12px) - for fine print and captions
   * - `sm`: Small (14px) - for secondary information
   * - `base`: Base size (16px) - for body text (default)
   * - `lg`: Large (18px) - for emphasized body text
   * - `xl`-`4xl`: Extra large sizes (20px-36px) - for headings
   * 
   * @default TextSize.Base
   * @example
   * ```tsx
   * <Text size={TextSize.ExtraSmall}>Caption text</Text>
   * <Text size={TextSize.ExtraLarge3}>Large heading</Text>
   * ```
   * @since 1.0.0
   */
  size?: TextSize | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  
  /** 
   * Font weight for emphasis and hierarchy.
   * 
   * - `light`: Light weight (300) - for subtle text
   * - `normal`: Normal weight (400) - for body text (default)
   * - `medium`: Medium weight (500) - for slight emphasis
   * - `semibold`: Semi-bold weight (600) - for sub-headings
   * - `bold`: Bold weight (700) - for headings and strong emphasis
   * 
   * @default TextWeight.Normal
   * @example
   * ```tsx
   * <Text weight={TextWeight.Bold}>Important text</Text>
   * <Text weight={TextWeight.Light}>Subtle text</Text>
   * ```
   * @since 1.0.0
   */
  weight?: TextWeight | 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  
  /** 
   * Text color for semantic meaning and visual hierarchy.
   * 
   * - `primary`: Highest contrast text for main content
   * - `secondary`: Medium contrast text for secondary content
   * - `disabled`: Low contrast text for disabled states
   * - `success`/`warning`/`error`/`info`: Semantic colors for feedback
   * - `inherit`: Inherits color from parent element
   * 
   * @default TextColor.Primary
   * @example
   * ```tsx
   * <Text color={TextColor.Success}>Success message</Text>
   * <Text color={TextColor.Secondary}>Secondary information</Text>
   * ```
   * @since 1.0.0
   */
  color?: TextColor | 'primary' | 'secondary' | 'disabled' | 'success' | 'warning' | 'error' | 'info' | 'inherit';
  
  /** 
   * Text alignment within its container.
   * 
   * - `left`: Left-aligned text (default)
   * - `center`: Center-aligned text
   * - `right`: Right-aligned text
   * - `justify`: Justified text with even edges
   * 
   * @default TextAlign.Left
   * @example
   * ```tsx
   * <Text align={TextAlign.Center}>Centered text</Text>
   * <Text align={TextAlign.Right}>Right-aligned text</Text>
   * ```
   * @since 1.0.0
   */
  align?: TextAlign | 'left' | 'center' | 'right' | 'justify';
  
  /** 
   * Line height for text readability and vertical rhythm.
   * 
   * - `tight`: Compact line height (1.25) - for headings
   * - `normal`: Standard line height (1.5) - for body text (default)
   * - `relaxed`: Spacious line height (1.75) - for long-form content
   * 
   * @default 'normal'
   * @example
   * ```tsx
   * <Text lineHeight="tight">Compact heading</Text>
   * <Text lineHeight="relaxed">Long-form content</Text>
   * ```
   * @since 1.0.0
   */
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  
  /** 
   * Font family from the design system's typography scale.
   * 
   * - `primary`: Primary font family for body text (default)
   * - `secondary`: Secondary font family for headings
   * - `mono`: Monospace font family for code
   * 
   * @default 'primary'
   * @example
   * ```tsx
   * <Text fontFamily="mono">Code snippet</Text>
   * <Text fontFamily="secondary">Display heading</Text>
   * ```
   * @since 1.0.0
   */
  fontFamily?: 'primary' | 'secondary' | 'mono';
  
  /** 
   * Enable text truncation with ellipsis for overflow content.
   * When true, text that exceeds the container width will be cut off
   * and display an ellipsis (...). Requires a fixed width container.
   * 
   * @default false
   * @example
   * ```tsx
   * <Text truncate style={{ maxWidth: '200px' }}>
   *   This very long text will be truncated with ellipsis
   * </Text>
   * ```
   * @since 1.0.0
   */
  truncate?: boolean;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as = 'p',
      size = 'base',
      weight = 'normal',
      color = 'primary',
      align = 'left',
      lineHeight = 'normal',
      fontFamily = 'primary',
      truncate = false,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const typography = useTypography();
    const colors = useColors();

    const getColor = () => {
      switch (color) {
        case 'secondary':
          return colors.text.secondary;
        case 'disabled':
          return colors.text.disabled;
        case 'success':
          return colors.success;
        case 'warning':
          return colors.warning;
        case 'error':
          return colors.error;
        case 'info':
          return colors.info;
        case 'inherit':
          return 'inherit';
        case 'primary':
        default:
          return colors.text.primary;
      }
    };

    const textStyles: React.CSSProperties = {
      fontSize: typography.fontSize[size],
      fontWeight: typography.fontWeight[weight],
      fontFamily: typography.fontFamily[fontFamily],
      lineHeight: typography.lineHeight[lineHeight],
      color: getColor(),
      textAlign: align,
      margin: 0,
      padding: 0,
      ...(truncate && {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
      ...style,
    };

    const Component = as;

    return (
      <Component
        ref={ref as any}
        className={className}
        style={textStyles}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
