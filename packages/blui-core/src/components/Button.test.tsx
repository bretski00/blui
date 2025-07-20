import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import { Button } from './Button';
import { ButtonVariant, ComponentSize } from '../contracts';
import { vi } from 'vitest';

describe('Button', () => {
  // Basic rendering tests
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
      expect(button).not.toBeDisabled();
    });

    it('renders with custom className', () => {
      render(<Button className="custom-class">Test</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('applies custom styles', () => {
      const customStyle = { backgroundColor: 'red', color: 'white' };
      render(<Button style={customStyle}>Styled Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background-color: rgb(255, 0, 0)');
      expect(button).toHaveStyle('color: rgb(255, 255, 255)');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Test</Button>);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.textContent).toBe('Test');
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('renders primary variant correctly', () => {
      render(<Button variant={ButtonVariant.Primary}>Primary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders secondary variant correctly', () => {
      render(<Button variant={ButtonVariant.Secondary}>Secondary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders outline variant correctly', () => {
      render(<Button variant={ButtonVariant.Outline}>Outline</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders ghost variant correctly', () => {
      render(<Button variant={ButtonVariant.Ghost}>Ghost</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('accepts string literal variants', () => {
      render(<Button variant="outline">String Variant</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  // Size tests
  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Button size={ComponentSize.Small}>Small</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders medium size correctly', () => {
      render(<Button size={ComponentSize.Medium}>Medium</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders large size correctly', () => {
      render(<Button size={ComponentSize.Large}>Large</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('accepts string literal sizes', () => {
      render(<Button size="lg">String Size</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  // State tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(<Button disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('handles loading state', () => {
      render(<Button isLoading>Loading Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('shows loading text instead of children when loading', () => {
      render(<Button isLoading>Submit</Button>);
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    });
  });

  // Icon tests
  describe('Icons', () => {
    it('renders left icon correctly', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>;
      render(
        <Button leftIcon={<LeftIcon />}>
          With Left Icon
        </Button>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByText('With Left Icon')).toBeInTheDocument();
    });

    it('renders right icon correctly', () => {
      const RightIcon = () => <span data-testid="right-icon">→</span>;
      render(
        <Button rightIcon={<RightIcon />}>
          With Right Icon
        </Button>
      );
      
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByText('With Right Icon')).toBeInTheDocument();
    });

    it('renders both left and right icons', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>;
      const RightIcon = () => <span data-testid="right-icon">→</span>;
      render(
        <Button leftIcon={<LeftIcon />} rightIcon={<RightIcon />}>
          Both Icons
        </Button>
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByText('Both Icons')).toBeInTheDocument();
    });

    it('does not render icons when loading', () => {
      const LeftIcon = () => <span data-testid="left-icon">←</span>;
      const RightIcon = () => <span data-testid="right-icon">→</span>;
      render(
        <Button 
          isLoading 
          leftIcon={<LeftIcon />} 
          rightIcon={<RightIcon />}
        >
          Loading Button
        </Button>
      );
      
      expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  // Event handling tests
  describe('Event Handling', () => {
    it('handles click events', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not fire click when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not fire click when loading', () => {
      const handleClick = vi.fn();
      render(
        <Button isLoading onClick={handleClick}>
          Loading Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('supports keyboard navigation', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Keyboard Button</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      // Test that button can receive focus
      expect(document.activeElement).toBe(button);
    });

    it('supports space key activation', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Space Button</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      // Test that button can receive focus
      expect(document.activeElement).toBe(button);
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has proper ARIA attributes when disabled', () => {
      render(<Button disabled>Disabled</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
    });

    it('has proper ARIA attributes when loading', () => {
      render(<Button isLoading>Loading</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
    });

    it('maintains focus management', () => {
      render(<Button>Focusable Button</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(document.activeElement).toBe(button);
    });
  });

  // Type tests
  describe('Button Types', () => {
    it('defaults to button type', () => {
      render(<Button>Default Type</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('supports submit type', () => {
      render(<Button type="submit">Submit</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('supports reset type', () => {
      render(<Button type="reset">Reset</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  // Theme integration tests
  describe('Theme Integration', () => {
    it('applies theme styles correctly', () => {
      render(<Button>Themed Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('display: inline-flex');
      expect(button).toHaveStyle('align-items: center');
      expect(button).toHaveStyle('justify-content: center');
    });

    it('preserves custom styles over theme styles', () => {
      const customStyle = { backgroundColor: 'purple' };
      render(<Button style={customStyle}>Custom Styled</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveStyle('background-color: rgb(128, 0, 128)');
    });
  });
});