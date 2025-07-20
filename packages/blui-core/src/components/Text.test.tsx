import React from 'react';
import { render, screen } from '../test-utils';
import { Text } from './Text';
import { ComponentSize } from '../contracts';

describe('Text', () => {
  // Basic rendering tests
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Text>Default text</Text>);
      
      const text = screen.getByText('Default text');
      expect(text).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Text className="custom-text">Custom Text</Text>);
      
      const text = screen.getByText('Custom Text');
      expect(text).toHaveClass('custom-text');
    });

    it('applies custom styles', () => {
      const customStyle = { color: 'blue', fontSize: '20px' };
      render(<Text style={customStyle}>Styled Text</Text>);
      
      const text = screen.getByText('Styled Text');
      expect(text).toHaveStyle('color: rgb(0, 0, 255)');
      expect(text).toHaveStyle('font-size: 20px');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLElement>();
      render(<Text ref={ref}>Ref Text</Text>);
      
      expect(ref.current).toBeInstanceOf(HTMLElement);
      expect(ref.current?.textContent).toBe('Ref Text');
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('renders body variant correctly', () => {
      render(<Text variant="body">Body Text</Text>);
      
      const text = screen.getByText('Body Text');
      expect(text).toBeInTheDocument();
    });

    it('renders heading variant correctly', () => {
      render(<Text variant="heading">Heading Text</Text>);
      
      const text = screen.getByText('Heading Text');
      expect(text).toBeInTheDocument();
    });

    it('renders caption variant correctly', () => {
      render(<Text variant="caption">Caption Text</Text>);
      
      const text = screen.getByText('Caption Text');
      expect(text).toBeInTheDocument();
    });

    it('renders overline variant correctly', () => {
      render(<Text variant="overline">Overline Text</Text>);
      
      const text = screen.getByText('Overline Text');
      expect(text).toBeInTheDocument();
    });
  });

  // Size tests
  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Text size={ComponentSize.Small}>Small Text</Text>);
      
      const text = screen.getByText('Small Text');
      expect(text).toBeInTheDocument();
    });

    it('renders medium size correctly', () => {
      render(<Text size={ComponentSize.Medium}>Medium Text</Text>);
      
      const text = screen.getByText('Medium Text');
      expect(text).toBeInTheDocument();
    });

    it('renders large size correctly', () => {
      render(<Text size={ComponentSize.Large}>Large Text</Text>);
      
      const text = screen.getByText('Large Text');
      expect(text).toBeInTheDocument();
    });

    it('accepts string literal sizes', () => {
      render(<Text size="lg">String Size Text</Text>);
      
      const text = screen.getByText('String Size Text');
      expect(text).toBeInTheDocument();
    });
  });

  // Element tests
  describe('HTML Elements', () => {
    it('renders as paragraph by default', () => {
      render(<Text>Default Element</Text>);
      
      const text = screen.getByText('Default Element');
      // Text component renders as 'p' by default
      expect(text.tagName).toBe('P');
    });

    it('renders as different HTML elements', () => {
      render(<Text as="p">Paragraph Text</Text>);
      
      const text = screen.getByText('Paragraph Text');
      expect(text.tagName).toBe('P');
    });

    it('renders as h1 element', () => {
      render(<Text as="h1">Heading 1</Text>);
      
      const text = screen.getByRole('heading', { level: 1 });
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe('H1');
    });

    it('renders as div element', () => {
      render(<Text as="div">Div Text</Text>);
      
      const text = screen.getByText('Div Text');
      expect(text.tagName).toBe('DIV');
    });
  });

  // Color tests
  describe('Colors', () => {
    it('renders primary color correctly', () => {
      render(<Text color="primary">Primary Text</Text>);
      
      const text = screen.getByText('Primary Text');
      expect(text).toBeInTheDocument();
    });

    it('renders secondary color correctly', () => {
      render(<Text color="secondary">Secondary Text</Text>);
      
      const text = screen.getByText('Secondary Text');
      expect(text).toBeInTheDocument();
    });

    it('renders disabled color correctly', () => {
      render(<Text color="disabled">Disabled Text</Text>);
      
      const text = screen.getByText('Disabled Text');
      expect(text).toBeInTheDocument();
    });

    it('renders error color correctly', () => {
      render(<Text color="error">Error Text</Text>);
      
      const text = screen.getByText('Error Text');
      expect(text).toBeInTheDocument();
    });
  });

  // Weight tests
  describe('Font Weight', () => {
    it('renders normal weight correctly', () => {
      render(<Text weight="normal">Normal Weight</Text>);
      
      const text = screen.getByText('Normal Weight');
      expect(text).toBeInTheDocument();
    });

    it('renders bold weight correctly', () => {
      render(<Text weight="bold">Bold Text</Text>);
      
      const text = screen.getByText('Bold Text');
      expect(text).toBeInTheDocument();
    });

    it('renders semibold weight correctly', () => {
      render(<Text weight="semibold">Semibold Text</Text>);
      
      const text = screen.getByText('Semibold Text');
      expect(text).toBeInTheDocument();
    });
  });

  // Content tests
  describe('Content', () => {
    it('renders plain text content', () => {
      render(<Text>Simple text content</Text>);
      
      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('renders nested elements', () => {
      render(
        <Text>
          Text with <em>emphasis</em> and <strong>strong</strong>
        </Text>
      );
      
      expect(screen.getByText(/Text with/)).toBeInTheDocument();
      expect(screen.getByText('emphasis')).toBeInTheDocument();
      expect(screen.getByText('strong')).toBeInTheDocument();
    });

    it('renders long text content', () => {
      const longText = 'This is a very long text content that should be rendered properly without any issues and should wrap correctly';
      render(<Text>{longText}</Text>);
      
      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });

  // Theme integration tests
  describe('Theme Integration', () => {
    it('applies theme styles correctly', () => {
      render(<Text>Themed Text</Text>);
      
      const text = screen.getByText('Themed Text');
      expect(text).toBeInTheDocument();
    });

    it('preserves custom styles over theme styles', () => {
      const customStyle = { color: 'purple' };
      render(<Text style={customStyle}>Custom Styled Text</Text>);
      
      const text = screen.getByText('Custom Styled Text');
      expect(text).toHaveStyle('color: rgb(128, 0, 128)');
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('supports ARIA attributes', () => {
      render(<Text aria-label="Important text">Accessible Text</Text>);
      
      const text = screen.getByLabelText('Important text');
      expect(text).toBeInTheDocument();
    });

    it('supports role attribute', () => {
      render(<Text role="note">Note Text</Text>);
      
      const text = screen.getByRole('note');
      expect(text).toBeInTheDocument();
    });

    it('maintains semantic meaning with headings', () => {
      render(<Text as="h2" variant="heading">Section Heading</Text>);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Section Heading');
    });
  });
});
