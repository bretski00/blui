// Card component theme definition
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

// Default card theme
export const defaultCardTheme: CardTheme = {
  background: '#ffffff',
  border: '#e5e7eb',
  borderRadius: '0.5rem',
  shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  padding: {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  },
};

// Extend the ComponentThemes interface
declare module '../../theme/core' {
  interface ComponentThemes {
    card: CardTheme;
  }
}
