import { render, screen } from '../test-utils';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { defaultCoreTheme } from './defaultTheme';

// Test component to access theme context
const TestComponent = () => {
  const { theme } = useTheme();
  
  return (
    <div>
      <div data-testid="primary-color">{theme.colors.primary}</div>
    </div>
  );
};

describe('ThemeProvider', () => {
  // Basic functionality tests
  describe('Basic Functionality', () => {
    it('provides theme context to children', () => {
      render(
        <ThemeProvider theme={defaultCoreTheme}>
          <TestComponent />
        </ThemeProvider>
      );
      
      const primaryColor = screen.getByTestId('primary-color');
      expect(primaryColor).toHaveTextContent(defaultCoreTheme.colors.primary);
    });

    it('renders children correctly', () => {
      render(
        <ThemeProvider theme={defaultCoreTheme}>
          <div>Child Component</div>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Child Component')).toBeInTheDocument();
    });
  });

  // Custom theme tests
  describe('Custom Themes', () => {
    it('accepts custom theme configuration', () => {
      const customTheme = {
        ...defaultCoreTheme,
        colors: {
          ...defaultCoreTheme.colors,
          primary: '#custom-primary',
        },
      };

      render(
        <ThemeProvider theme={customTheme}>
          <TestComponent />
        </ThemeProvider>
      );
      
      const primaryColor = screen.getByTestId('primary-color');
      expect(primaryColor).toHaveTextContent('#custom-primary');
    });

    it('handles partial theme overrides', () => {
      const partialTheme = {
        ...defaultCoreTheme,
        colors: {
          ...defaultCoreTheme.colors,
          secondary: '#custom-secondary',
        },
      };

      render(
        <ThemeProvider theme={partialTheme}>
          <TestComponent />
        </ThemeProvider>
      );
      
      // Should still have original primary color
      const primaryColor = screen.getByTestId('primary-color');
      expect(primaryColor).toHaveTextContent(defaultCoreTheme.colors.primary);
    });
  });

  // Nested provider tests
  describe('Nested Providers', () => {
    it('supports nested theme providers', () => {
      const outerTheme = {
        ...defaultCoreTheme,
        colors: {
          ...defaultCoreTheme.colors,
          primary: '#outer-primary',
        },
      };

      const innerTheme = {
        ...defaultCoreTheme,
        colors: {
          ...defaultCoreTheme.colors,
          primary: '#inner-primary',
        },
      };

      const InnerComponent = () => {
        const { theme } = useTheme();
        return <div data-testid="inner-primary">{theme.colors.primary}</div>;
      };

      const OuterComponent = () => {
        const { theme } = useTheme();
        return (
          <div>
            <div data-testid="outer-primary">{theme.colors.primary}</div>
            <ThemeProvider theme={innerTheme}>
              <InnerComponent />
            </ThemeProvider>
          </div>
        );
      };

      render(
        <ThemeProvider theme={outerTheme}>
          <OuterComponent />
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('outer-primary')).toHaveTextContent('#outer-primary');
      expect(screen.getByTestId('inner-primary')).toHaveTextContent('#inner-primary');
    });
  });
});
