export interface NavbarTheme {
  container: {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: string;
    boxShadow?: string;
    height?: string;
    position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
    top?: string;
    zIndex?: number;
  };
  content: {
    maxWidth?: string;
    padding?: {
      x?: string;
      y?: string;
    };
    display?: string;
    alignItems?: string;
    justifyContent?: string;
  };
  brand: {
    display?: string;
    alignItems?: string;
    gap?: string;
  };
  navigation: {
    display?: string;
    alignItems?: string;
    gap?: string;
  };
  actions: {
    display?: string;
    alignItems?: string;
    gap?: string;
  };
}

/**
 * Default theme configuration for the Navbar component.
 * 
 * Provides sensible defaults for a sticky navigation header with
 * flexible layout sections for brand, navigation, and actions.
 * 
 * @since 1.0.0
 */
export const defaultNavbarTheme: NavbarTheme = {
  container: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: '0 0 1px 0',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    height: '64px',
    position: 'sticky',
    top: '0',
    zIndex: 100,
  },
  content: {
    maxWidth: '1200px',
    padding: {
      x: '1rem',
      y: '0',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  navigation: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
};

/**
 * Extends the global ComponentThemes interface to include navbar theme.
 * This enables type-safe theme access and automatic theme registration.
 * 
 * @internal This is handled automatically when the Navbar component is imported.
 */
declare module '../../theme/core' {
  interface ComponentThemes {
    /** Navbar component theme configuration */
    navbar: NavbarTheme;
  }
}
