/**
 * @file
 * Grid layout component with theme integration.
 */

import type { CSSProperties, ReactNode, ElementType } from 'react';
import type { GridLayoutTheme } from './core';
import { defaultGridLayoutTheme } from './defaultThemes';
import { registerLayoutTheme } from './registry';
import { useLayoutTheme } from './LayoutProvider';

// Register the grid theme when this module is imported
registerLayoutTheme('grid', defaultGridLayoutTheme);

/**
 * Props for the Grid layout component
 */
export interface GridProps {
  /** Child components to arrange in grid */
  children: ReactNode;
  /** Number of columns or custom grid template */
  columns?: keyof GridLayoutTheme['templates']['columns'] | string;
  /** Gap between grid items */
  gap?: keyof GridLayoutTheme['gap'] | string;
  /** Grid rows configuration */
  rows?: string;
  /** Justify content alignment */
  justifyContent?: keyof GridLayoutTheme['alignment']['justify'];
  /** Align items alignment */
  alignItems?: keyof GridLayoutTheme['alignment']['align'];
  /** Justify items alignment */
  justifyItems?: keyof GridLayoutTheme['alignment']['justify'];
  /** Align content alignment */
  alignContent?: keyof GridLayoutTheme['alignment']['align'];
  /** Auto-fit columns with minimum width */
  autoFit?: boolean;
  /** Minimum width for auto-fit columns */
  autoFitMinWidth?: string;
  /** Maximum width for auto-fit columns */
  autoFitMaxWidth?: string;
  /** Additional CSS properties */
  style?: CSSProperties;
  /** CSS class name */
  className?: string;
  /** HTML element type to render */
  as?: ElementType;
}

/**
 * Grid layout component that provides CSS Grid functionality with theme support.
 * 
 * @param root0
 * @param root0.children
 * @param root0.columns
 * @param root0.gap
 * @param root0.rows
 * @param root0.justifyContent
 * @param root0.alignItems
 * @param root0.justifyItems
 * @param root0.alignContent
 * @param root0.autoFit
 * @param root0.autoFitMinWidth
 * @param root0.autoFitMaxWidth
 * @param root0.style
 * @param root0.className
 * @param root0.as
 * @example
 * ```tsx
 * // Basic grid with 3 columns
 * <Grid columns="3" gap="md">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * 
 * // Auto-fit grid
 * <Grid autoFit autoFitMinWidth="200px" gap="lg">
 *   <Card>Card 1</Card>
 *   <Card>Card 2</Card>
 *   <Card>Card 3</Card>
 * </Grid>
 * 
 * // Custom grid template
 * <Grid columns="200px 1fr 100px" rows="auto 1fr">
 *   <div>Sidebar</div>
 *   <div>Main</div>
 *   <div>Aside</div>
 * </Grid>
 * ```
 */
export function Grid({
  children,
  columns = '1',
  gap = 'default',
  rows,
  justifyContent,
  alignItems,
  justifyItems,
  alignContent,
  autoFit = false,
  autoFitMinWidth,
  autoFitMaxWidth,
  style,
  className,
  as: Component = 'div',
  ...props
}: GridProps) {
  const gridTheme = useLayoutTheme<GridLayoutTheme>('grid');

  // Resolve grid template columns
  const getGridTemplateColumns = (): string => {
    if (autoFit) {
      const minWidth = autoFitMinWidth || gridTheme.templates.autoFit.minWidth;
      const maxWidth = autoFitMaxWidth || gridTheme.templates.autoFit.maxWidth;
      return `repeat(auto-fit, minmax(${minWidth}, ${maxWidth}))`;
    }

    // Check if columns is a predefined template
    if (columns in gridTheme.templates.columns) {
      return gridTheme.templates.columns[columns as keyof typeof gridTheme.templates.columns];
    }

    // Return custom columns string
    return columns;
  };

  // Resolve gap value
  const getGap = (): string => {
    if (gap in gridTheme.gap) {
      return gridTheme.gap[gap as keyof typeof gridTheme.gap];
    }
    return gap;
  };

  // Resolve alignment values
  const getAlignment = (
    value: string | undefined,
    type: 'justify' | 'align'
  ): string | undefined => {
    if (!value) return undefined;
    
    const alignmentMap = gridTheme.alignment[type];
    if (value in alignmentMap) {
      return alignmentMap[value as keyof typeof alignmentMap];
    }
    return value;
  };

  const gridStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: getGridTemplateColumns(),
    ...(rows && { gridTemplateRows: rows }),
    gap: getGap(),
    ...(justifyContent && { justifyContent: getAlignment(justifyContent, 'justify') }),
    ...(alignItems && { alignItems: getAlignment(alignItems, 'align') }),
    ...(justifyItems && { justifyItems: getAlignment(justifyItems, 'justify') }),
    ...(alignContent && { alignContent: getAlignment(alignContent, 'align') }),
    ...style,
  };

  return (
    <Component
      className={className}
      style={gridStyles}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Grid item component for advanced grid item positioning
 */
export interface GridItemProps {
  /** Child components */
  children: ReactNode;
  /** Grid column start/end */
  column?: string;
  /** Grid row start/end */
  row?: string;
  /** Grid area name */
  area?: string;
  /** Justify self alignment */
  justifySelf?: keyof GridLayoutTheme['alignment']['justify'];
  /** Align self alignment */
  alignSelf?: keyof GridLayoutTheme['alignment']['align'];
  /** Additional CSS properties */
  style?: CSSProperties;
  /** CSS class name */
  className?: string;
  /** HTML element type to render */
  as?: ElementType;
}

/**
 * Grid item component for positioning within a Grid.
 * 
 * @param root0
 * @param root0.children
 * @param root0.column
 * @param root0.row
 * @param root0.area
 * @param root0.justifySelf
 * @param root0.alignSelf
 * @param root0.style
 * @param root0.className
 * @param root0.as
 * @example
 * ```tsx
 * <Grid columns="3" rows="2">
 *   <GridItem column="1 / 3" row="1">Spans 2 columns</GridItem>
 *   <GridItem area="main">Named area</GridItem>
 *   <GridItem justifySelf="center">Centered item</GridItem>
 * </Grid>
 * ```
 */
export function GridItem({
  children,
  column,
  row,
  area,
  justifySelf,
  alignSelf,
  style,
  className,
  as: Component = 'div',
  ...props
}: GridItemProps) {
  const gridTheme = useLayoutTheme<GridLayoutTheme>('grid');

  // Resolve alignment values
  const getAlignment = (
    value: string | undefined,
    type: 'justify' | 'align'
  ): string | undefined => {
    if (!value) return undefined;
    
    const alignmentMap = gridTheme.alignment[type];
    if (value in alignmentMap) {
      return alignmentMap[value as keyof typeof alignmentMap];
    }
    return value;
  };

  const itemStyles: CSSProperties = {
    ...(column && { gridColumn: column }),
    ...(row && { gridRow: row }),
    ...(area && { gridArea: area }),
    ...(justifySelf && { justifySelf: getAlignment(justifySelf, 'justify') }),
    ...(alignSelf && { alignSelf: getAlignment(alignSelf, 'align') }),
    ...style,
  };

  return (
    <Component
      className={className}
      style={itemStyles}
      {...props}
    >
      {children}
    </Component>
  );
}
