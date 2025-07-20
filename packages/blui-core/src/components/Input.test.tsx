import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../test-utils';
import { Input } from './Input';
import { ComponentSize } from '../contracts';

describe('Input', () => {
  // Basic rendering tests
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Email Address" />);
      
      expect(screen.getByText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter your email" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Enter your email');
    });

    it('renders with helper text', () => {
      render(<Input helperText="This field is required" />);
      
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  // Size tests
  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Input size={ComponentSize.Small} data-testid="small-input" />);
      
      const input = screen.getByTestId('small-input');
      expect(input).toBeInTheDocument();
    });

    it('renders medium size correctly', () => {
      render(<Input size={ComponentSize.Medium} data-testid="medium-input" />);
      
      const input = screen.getByTestId('medium-input');
      expect(input).toBeInTheDocument();
    });

    it('renders large size correctly', () => {
      render(<Input size={ComponentSize.Large} data-testid="large-input" />);
      
      const input = screen.getByTestId('large-input');
      expect(input).toBeInTheDocument();
    });

    it('accepts string literal sizes', () => {
      render(<Input size="lg" data-testid="string-size-input" />);
      
      const input = screen.getByTestId('string-size-input');
      expect(input).toBeInTheDocument();
    });
  });

  // State tests
  describe('States', () => {
    it('handles disabled state', () => {
      render(<Input disabled />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('handles error state', () => {
      render(<Input error />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('handles error state with message', () => {
      render(<Input error helperText="This field is required" />);
      
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('handles required state', () => {
      render(<Input required />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('required');
    });
  });

  // Input types
  describe('Input Types', () => {
    it('renders email input correctly', () => {
      render(<Input type="email" />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders password input correctly', () => {
      render(<Input type="password" />);

      const input = screen.getByDisplayValue(''); // Get by empty value since password inputs don't have textbox role
      expect(input).toHaveAttribute('type', 'password');
    });    it('renders number input correctly', () => {
      render(<Input type="number" />);
      
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
    });
  });

  // Icon tests
  describe('Icons', () => {
    it('renders left icon correctly', () => {
      const LeftIcon = () => <span data-testid="left-icon">🔍</span>;
      render(<Input leftIcon={<LeftIcon />} />);
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon correctly', () => {
      const RightIcon = () => <span data-testid="right-icon">✕</span>;
      render(<Input rightIcon={<RightIcon />} />);
      
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders both left and right icons', () => {
      const LeftIcon = () => <span data-testid="left-icon">🔍</span>;
      const RightIcon = () => <span data-testid="right-icon">✕</span>;
      render(<Input leftIcon={<LeftIcon />} rightIcon={<RightIcon />} />);
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  // Event handling tests
  describe('Event Handling', () => {
    it('handles value changes', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test value' } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(input).toHaveValue('test value');
    });

    it('handles focus events', () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('handles blur events', () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.blur(input);
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('properly sets disabled attribute when disabled', () => {
      const handleChange = vi.fn();
      const handleFocus = vi.fn();
      render(<Input disabled onChange={handleChange} onFocus={handleFocus} />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('associates label with input correctly', () => {
      render(<Input label="Email Address" />);
      
      const input = screen.getByLabelText('Email Address');
      expect(input).toBeInTheDocument();
    });

    it('displays helper text correctly', () => {
      render(<Input label="Password" helperText="Must be 8 characters" />);
      
      const input = screen.getByLabelText('Password');
      const helperText = screen.getByText('Must be 8 characters');
      
      expect(input).toBeInTheDocument();
      expect(helperText).toBeInTheDocument();
    });

    it('indicates required fields', () => {
      render(<Input label="Required Field" required />);
      
      const input = screen.getByLabelText('Required Field');
      expect(input).toHaveAttribute('required');
    });

    it('supports custom ARIA attributes', () => {
      render(<Input aria-label="Custom label" />);
      
      const input = screen.getByLabelText('Custom label');
      expect(input).toBeInTheDocument();
    });
  });

  // Theme integration tests
  describe('Theme Integration', () => {
    it('applies theme styles correctly', () => {
      render(<Input />);
      
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('preserves custom styles', () => {
      const customStyle = { backgroundColor: 'lightgray' };
      render(<Input style={customStyle} />);
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveStyle('background-color: rgb(211, 211, 211)');
    });
  });
});
