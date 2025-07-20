import React from 'react';
import { render, screen, fireEvent } from '../test-utils';
import { Card } from './Card';
import { CardVariant, CardPadding } from '../contracts';
import { vi } from 'vitest';

describe('Card', () => {
  // Basic rendering tests
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Card>Card content</Card>);
      
      const card = screen.getByText('Card content');
      expect(card).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Card className="custom-card">Test Card</Card>);
      
      const card = screen.getByText('Test Card');
      expect(card).toHaveClass('custom-card');
    });

    it('applies custom styles', () => {
      const customStyle = { backgroundColor: 'lightblue', padding: '20px' };
      render(<Card style={customStyle}>Styled Card</Card>);
      
      const card = screen.getByText('Styled Card');
      expect(card).toHaveStyle('background-color: rgb(173, 216, 230)');
      expect(card).toHaveStyle('padding: 20px');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Ref Card</Card>);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.textContent).toBe('Ref Card');
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('renders elevated variant correctly', () => {
      render(<Card variant={CardVariant.Elevated}>Elevated Card</Card>);
      
      const card = screen.getByText('Elevated Card');
      expect(card).toBeInTheDocument();
    });

    it('renders outlined variant correctly', () => {
      render(<Card variant={CardVariant.Outlined}>Outlined Card</Card>);
      
      const card = screen.getByText('Outlined Card');
      expect(card).toBeInTheDocument();
    });

    it('renders filled variant correctly', () => {
      render(<Card variant={CardVariant.Filled}>Filled Card</Card>);
      
      const card = screen.getByText('Filled Card');
      expect(card).toBeInTheDocument();
    });

    it('accepts string literal variants', () => {
      render(<Card variant="outlined">String Variant Card</Card>);
      
      const card = screen.getByText('String Variant Card');
      expect(card).toBeInTheDocument();
    });
  });

  // Padding tests
  describe('Padding', () => {
    it('renders small padding correctly', () => {
      render(<Card padding={CardPadding.Small}>Small Padding</Card>);
      
      const card = screen.getByText('Small Padding');
      expect(card).toBeInTheDocument();
    });

    it('renders medium padding correctly', () => {
      render(<Card padding={CardPadding.Medium}>Medium Padding</Card>);
      
      const card = screen.getByText('Medium Padding');
      expect(card).toBeInTheDocument();
    });

    it('renders large padding correctly', () => {
      render(<Card padding={CardPadding.Large}>Large Padding</Card>);
      
      const card = screen.getByText('Large Padding');
      expect(card).toBeInTheDocument();
    });

    it('accepts string literal padding', () => {
      render(<Card padding="lg">String Padding</Card>);
      
      const card = screen.getByText('String Padding');
      expect(card).toBeInTheDocument();
    });
  });

  // Hoverable tests
  describe('Hoverable', () => {
    it('handles hoverable state', () => {
      render(<Card hoverable>Hoverable Card</Card>);
      
      const card = screen.getByText('Hoverable Card');
      expect(card).toBeInTheDocument();
    });

    it('handles click events when hoverable', () => {
      const handleClick = vi.fn();
      render(
        <Card hoverable onClick={handleClick}>
          Clickable Card
        </Card>
      );
      
      const card = screen.getByText('Clickable Card');
      fireEvent.click(card);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // Theme integration tests
  describe('Theme Integration', () => {
    it('applies theme styles correctly', () => {
      render(<Card>Themed Card</Card>);
      
      const card = screen.getByText('Themed Card');
      expect(card).toBeInTheDocument();
    });

    it('preserves custom styles over theme styles', () => {
      const customStyle = { backgroundColor: 'orange' };
      render(<Card style={customStyle}>Custom Styled Card</Card>);
      
      const card = screen.getByText('Custom Styled Card');
      expect(card).toHaveStyle('background-color: rgb(255, 165, 0)');
    });
  });

  // Content tests
  describe('Content', () => {
    it('renders complex nested content', () => {
      render(
        <Card>
          <div>
            <h3>Card Title</h3>
            <p>Card description</p>
            <button>Action</button>
          </div>
        </Card>
      );
      
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('renders multiple cards', () => {
      render(
        <div>
          <Card>First Card</Card>
          <Card>Second Card</Card>
        </div>
      );
      
      expect(screen.getByText('First Card')).toBeInTheDocument();
      expect(screen.getByText('Second Card')).toBeInTheDocument();
    });
  });
});
