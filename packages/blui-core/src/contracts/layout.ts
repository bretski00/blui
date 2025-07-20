/**
 * @file Layout system definitions
 */

// =============================================================================
// LAYOUT SPECIFIC
// =============================================================================

/**
 * [Since 1.0.0] Available flex direction options.
 * Defines the direction for flex layout components.
 * 
 * @example
 * ```tsx
 * <Flex direction={FlexDirection.Column}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 * 
 * @since 1.0.0
 */
export const FlexDirection = {
  /** Horizontal layout - left to right */
  Row: 'row',
  /** Horizontal layout - right to left */
  RowReverse: 'row-reverse',
  /** Vertical layout - top to bottom */
  Column: 'column',
  /** Vertical layout - bottom to top */
  ColumnReverse: 'column-reverse'
} as const;

/**
 * [Since 1.0.0] Union type of all available flex direction values.
 * 
 * @since 1.0.0
 */
export type FlexDirection = typeof FlexDirection[keyof typeof FlexDirection];

/**
 * [Since 1.0.0] Available flex justification options.
 * Defines how flex items are distributed along the main axis.
 * 
 * @example
 * ```tsx
 * <Flex justify={FlexJustify.SpaceBetween}>
 *   <div>Left</div>
 *   <div>Right</div>
 * </Flex>
 * ```
 * 
 * @since 1.0.0
 */
export const FlexJustify = {
  /** Items packed to start */
  Start: 'start',
  /** Items centered */
  Center: 'center',
  /** Items packed to end */
  End: 'end',
  /** Items distributed with space between */
  SpaceBetween: 'between',
  /** Items distributed with space around */
  SpaceAround: 'around',
  /** Items distributed with space evenly */
  SpaceEvenly: 'evenly'
} as const;

/**
 * [Since 1.0.0] Union type of all available flex justify values.
 * 
 * @since 1.0.0
 */
export type FlexJustify = typeof FlexJustify[keyof typeof FlexJustify];

/**
 * [Since 1.0.0] Available flex alignment options.
 * Defines how flex items are aligned along the cross axis.
 * 
 * @example
 * ```tsx
 * <Flex align={FlexAlign.Center}>
 *   <div>Centered item</div>
 * </Flex>
 * ```
 * 
 * @since 1.0.0
 */
export const FlexAlign = {
  /** Items aligned to start */
  Start: 'start',
  /** Items centered */
  Center: 'center',
  /** Items aligned to end */
  End: 'end',
  /** Items stretched to fill */
  Stretch: 'stretch',
  /** Items aligned to baseline */
  Baseline: 'baseline'
} as const;

/**
 * [Since 1.0.0] Union type of all available flex align values.
 * 
 * @since 1.0.0
 */
export type FlexAlign = typeof FlexAlign[keyof typeof FlexAlign];
