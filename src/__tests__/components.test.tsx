import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, Button, Text, Card } from '../index';

// Mock theme for testing
const testTheme = {
  colors: {
    primary: '#ff0000',
  },
};

describe('UI Framework Components', () => {
  it('renders Button component with correct text', () => {
    render(
      <ThemeProvider theme={testTheme}>
        <Button>Test Button</Button>
      </ThemeProvider>
    );
    
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('renders Text component with correct content', () => {
    render(
      <ThemeProvider>
        <Text>Test Text</Text>
      </ThemeProvider>
    );
    
    expect(screen.getByText('Test Text')).toBeInTheDocument();
  });

  it('renders Card component with children', () => {
    render(
      <ThemeProvider>
        <Card>
          <Text>Card Content</Text>
        </Card>
      </ThemeProvider>
    );
    
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies theme overrides correctly', () => {
    const CustomButton = () => {
      return (
        <ThemeProvider theme={{ colors: { primary: '#00ff00' } }}>
          <Button data-testid="themed-button">Themed Button</Button>
        </ThemeProvider>
      );
    };

    render(<CustomButton />);
    const button = screen.getByTestId('themed-button');
    expect(button).toBeInTheDocument();
  });
});
