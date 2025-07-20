// Core theme type definitions
export interface ColorPalette {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
}

export interface Typography {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface Shadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Breakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ZIndex {
  base: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  modal: number;
  popover: number;
  tooltip: number;
}

// Component-specific theme configurations
export interface ButtonTheme {
  colors: {
    primary: {
      background: string;
      backgroundHover: string;
      backgroundActive: string;
      text: string;
      border: string;
    };
    secondary: {
      background: string;
      backgroundHover: string;
      backgroundActive: string;
      text: string;
      border: string;
    };
    outline: {
      background: string;
      backgroundHover: string;
      backgroundActive: string;
      text: string;
      border: string;
    };
    ghost: {
      background: string;
      backgroundHover: string;
      backgroundActive: string;
      text: string;
      border: string;
    };
  };
  sizes: {
    sm: {
      padding: string;
      fontSize: string;
      height: string;
    };
    md: {
      padding: string;
      fontSize: string;
      height: string;
    };
    lg: {
      padding: string;
      fontSize: string;
      height: string;
    };
  };
  borderRadius: string;
  fontWeight: number;
  transition: string;
}

export interface InputTheme {
  colors: {
    background: string;
    border: string;
    borderFocus: string;
    borderError: string;
    text: string;
    placeholder: string;
  };
  sizes: {
    sm: {
      padding: string;
      fontSize: string;
      height: string;
    };
    md: {
      padding: string;
      fontSize: string;
      height: string;
    };
    lg: {
      padding: string;
      fontSize: string;
      height: string;
    };
  };
  borderRadius: string;
  transition: string;
}

export interface CardTheme {
  background: string;
  border: string;
  borderRadius: string;
  shadow: string;
  padding: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Main theme interface
export interface Theme {
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  breakpoints: Breakpoints;
  zIndex: ZIndex;
  components: {
    button: ButtonTheme;
    input: InputTheme;
    card: CardTheme;
  };
}

// Type for partial theme overrides
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ThemeOverride = DeepPartial<Theme>;
