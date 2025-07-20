import React from 'react';
import { render, screen } from '../test-utils';
import { Badge } from './Badge';
import { ComponentSize } from '../contracts';

describe('Badge', () => {
  // Basic rendering tests
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Badge>Badge Text</Badge>);
      
      const badge = screen.getByText('Badge Text');
      expect(badge).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Badge className="custom-badge">Custom Badge</Badge>);
      
      const badge = screen.getByText('Custom Badge');
      expect(badge).toHaveClass('custom-badge');
    });

    it('applies custom styles', () => {
      const customStyle = { backgroundColor: 'purple', color: 'white' };
      render(<Badge style={customStyle}>Styled Badge</Badge>);
      
      const badge = screen.getByText('Styled Badge');
      expect(badge).toHaveStyle('background-color: rgb(128, 0, 128)');
      expect(badge).toHaveStyle('color: rgb(255, 255, 255)');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Ref Badge</Badge>);
      
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.textContent).toBe('Ref Badge');
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('renders primary variant correctly', () => {
      render(<Badge variant="primary">Primary Badge</Badge>);
      
      const badge = screen.getByText('Primary Badge');
      expect(badge).toBeInTheDocument();
    });

    it('renders secondary variant correctly', () => {
      render(<Badge variant="secondary">Secondary Badge</Badge>);
      
      const badge = screen.getByText('Secondary Badge');
      expect(badge).toBeInTheDocument();
    });

    it('renders success variant correctly', () => {
      render(<Badge variant="success">Success Badge</Badge>);
      
      const badge = screen.getByText('Success Badge');
      expect(badge).toBeInTheDocument();
    });

    it('renders warning variant correctly', () => {
      render(<Badge variant="warning">Warning Badge</Badge>);
      
      const badge = screen.getByText('Warning Badge');
      expect(badge).toBeInTheDocument();
    });

    it('renders error variant correctly', () => {
      render(<Badge variant="error">Error Badge</Badge>);
      
      const badge = screen.getByText('Error Badge');
      expect(badge).toBeInTheDocument();
    });
  });

  // Size tests
  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Badge size={ComponentSize.Small}>Small Badge</Badge>);
      
      const badge = screen.getByText('Small Badge');
      expect(badge).toBeInTheDocument();
    });

    it('renders medium size correctly', () => {
      render(<Badge size={ComponentSize.Medium}>Medium Badge</Badge>);
      
      const badge = screen.getByText('Medium Badge');
      expect(badge).toBeInTheDocument();
    });

    it('renders large size correctly', () => {
      render(<Badge size={ComponentSize.Large}>Large Badge</Badge>);
      
      const badge = screen.getByText('Large Badge');
      expect(badge).toBeInTheDocument();
    });

    it('accepts string literal sizes', () => {
      render(<Badge size="lg">String Size Badge</Badge>);
      
      const badge = screen.getByText('String Size Badge');
      expect(badge).toBeInTheDocument();
    });
  });

  // Outline tests
  describe('Outline', () => {
    it('renders outlined badge correctly', () => {
      render(<Badge outline>Outlined Badge</Badge>);
      
      const badge = screen.getByText('Outlined Badge');
      expect(badge).toBeInTheDocument();
    });

    it('renders filled badge by default', () => {
      render(<Badge>Filled Badge</Badge>);
      
      const badge = screen.getByText('Filled Badge');
      expect(badge).toBeInTheDocument();
    });

    it('combines outline with different variants', () => {
      render(<Badge outline variant="success">Outlined Success</Badge>);
      
      const badge = screen.getByText('Outlined Success');
      expect(badge).toBeInTheDocument();
    });
  });

  // Content tests
  describe('Content', () => {
    it('renders text content', () => {
      render(<Badge>Simple Text</Badge>);
      
      expect(screen.getByText('Simple Text')).toBeInTheDocument();
    });

    it('renders numeric content', () => {
      render(<Badge>42</Badge>);
      
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders icon with text', () => {
      const StarIcon = () => <span data-testid="star-icon">⭐</span>;
      render(
        <Badge>
          <StarIcon /> Featured
        </Badge>
      );
      
      expect(screen.getByTestId('star-icon')).toBeInTheDocument();
      expect(screen.getByText('Featured')).toBeInTheDocument();
    });

    it('renders empty badge', () => {
      render(<Badge data-testid="empty-badge"></Badge>);
      
      const badge = screen.getByTestId('empty-badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toBeEmptyDOMElement();
    });
  });

  // Theme integration tests
  describe('Theme Integration', () => {
    it('applies theme styles correctly', () => {
      render(<Badge>Themed Badge</Badge>);
      
      const badge = screen.getByText('Themed Badge');
      expect(badge).toBeInTheDocument();
    });

    it('preserves custom styles over theme styles', () => {
      const customStyle = { backgroundColor: 'lime' };
      render(<Badge style={customStyle}>Custom Styled Badge</Badge>);
      
      const badge = screen.getByText('Custom Styled Badge');
      expect(badge).toHaveStyle('background-color: rgb(0, 255, 0)');
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('supports custom ARIA attributes', () => {
      render(<Badge aria-label="Status indicator">Active</Badge>);
      
      const badge = screen.getByLabelText('Status indicator');
      expect(badge).toBeInTheDocument();
    });

    it('supports role attribute', () => {
      render(<Badge role="status">Loading</Badge>);
      
      const badge = screen.getByRole('status');
      expect(badge).toBeInTheDocument();
    });

    it('can be used as count indicator', () => {
      render(
        <div>
          <span>Messages</span>
          <Badge aria-label="3 unread messages">3</Badge>
        </div>
      );
      
      expect(screen.getByLabelText('3 unread messages')).toBeInTheDocument();
    });
  });
});
