/**
 * Complete Usage Examples
 * 
 * This file demonstrates the comprehensive developer experience
 * provided by the BLUI Framework's type contracts system.
 */

import React from 'react';
import {
  // Core components
  Button,
  Card,
  Badge,
  Text,
  Input,
  Box,
  Flex,
  FlexItem,
  
  // Type contracts (C#-like interfaces)
  ButtonVariant,
  ComponentSize,
  ComponentVariant,
  CardVariant,
  CardPadding,
  TextSize,
  TextWeight,
  TextColor,
  TextAlign,
  TextElement,
  FlexDirection,
  FlexJustify,
  FlexAlign,
  Spacing,
  
  // Advanced TypeScript utilities
  createButtonConfig,
  createTextConfig,
  isButtonVariant,
  getContractOptions,
  
  // Consolidated contracts object
  Contracts,
  ComponentOptions,
  
  // Theme system
  useTheme
} from '../index';

// Import types separately
import type {
  ResponsiveSize,
  ResponsiveSpacing
} from '../index';

// ============================================================================
// Example 1: Basic Type-Safe Usage
// ============================================================================

export function BasicTypeExamples() {
  return (
    <div>
      <h2>Type-Safe Component Usage</h2>
      
      {/* Buttons with type contracts */}
      <Button 
        variant={ButtonVariant.Primary} 
        size={ComponentSize.Large}
      >
        Primary Button
      </Button>
      
      <Button 
        variant={ButtonVariant.Outline} 
        size={ComponentSize.Medium}
        leftIcon={<span>+</span>}
      >
        Add Item
      </Button>
      
      {/* Cards with type contracts */}
      <Card 
        variant={CardVariant.Elevated}
        padding={CardPadding.Large}
        hoverable
      >
        <Text 
          as={TextElement.Heading2}
          size={TextSize.ExtraLarge}
          weight={TextWeight.Bold}
          color={TextColor.Primary}
        >
          Card Title
        </Text>
        
        <Text 
          color={TextColor.Secondary}
          size={TextSize.Base}
        >
          Card content with proper typography
        </Text>
      </Card>
      
      {/* Badges */}
      <Badge 
        variant={ComponentVariant.Success}
        size={ComponentSize.Small}
      >
        Active
      </Badge>
    </div>
  );
}

// ============================================================================
// Example 2: Advanced Layout with Flex
// ============================================================================

export function AdvancedLayoutExample() {
  return (
    <Box p={Spacing.Large}>
      <Flex 
        direction={FlexDirection.Column}
        justify={FlexJustify.SpaceBetween}
        align={FlexAlign.Center}
        gap={Spacing.Medium}
      >
        <FlexItem flex="1">
          <Card 
            variant={CardVariant.Outlined}
            padding={CardPadding.Medium}
          >
            <Text align={TextAlign.Center}>
              Centered content in flex layout
            </Text>
          </Card>
        </FlexItem>
        
        <FlexItem>
          <Flex 
            direction={FlexDirection.Row}
            justify={FlexJustify.SpaceAround}
            gap={Spacing.Small}
          >
            <Button variant={ButtonVariant.Primary}>Action 1</Button>
            <Button variant={ButtonVariant.Secondary}>Action 2</Button>
            <Button variant={ButtonVariant.Ghost}>Cancel</Button>
          </Flex>
        </FlexItem>
      </Flex>
    </Box>
  );
}

// ============================================================================
// Example 3: Form with Type Contracts
// ============================================================================

export function TypeSafeFormExample() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  return (
    <Card 
      variant={CardVariant.Elevated}
      padding={CardPadding.Large}
    >
      <Text 
        as={TextElement.Heading1}
        size={TextSize.ExtraLarge2}
        weight={TextWeight.Bold}
        color={TextColor.Primary}
        align={TextAlign.Center}
      >
        Create Account
      </Text>
      
      <Box mt={Spacing.Large}>
        <Input
          label="Email Address"
          type="email"
          size={ComponentSize.Large}
          placeholder="Enter your email"
          value={formData.email}
          error={!!errors.email}
          helperText={errors.email || "We'll never share your email"}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        
        <Input
          label="Password"
          type="password"
          size={ComponentSize.Large}
          placeholder="Create a password"
          value={formData.password}
          error={!!errors.password}
          helperText={errors.password || "Minimum 8 characters"}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          size={ComponentSize.Large}
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
        
        <Box mt={Spacing.Large}>
          <Flex 
            direction={FlexDirection.Row}
            justify={FlexJustify.SpaceBetween}
          >
            <Button 
              variant={ButtonVariant.Ghost}
              size={ComponentSize.Large}
            >
              Cancel
            </Button>
            
            <Button 
              variant={ButtonVariant.Primary}
              size={ComponentSize.Large}
              type="submit"
            >
              Create Account
            </Button>
          </Flex>
        </Box>
      </Box>
    </Card>
  );
}

// ============================================================================
// Example 4: Using Contracts Object (Alternative Import Style)
// ============================================================================

export function ContractsObjectExample() {
  return (
    <div>
      <h2>Using Contracts Object</h2>
      
      {/* Alternative import style for organization */}
      <Button 
        variant={Contracts.ButtonVariant.Primary}
        size={Contracts.ComponentSize.Large}
      >
        Using Contracts Object
      </Button>
      
      <Text 
        size={Contracts.TextSize.ExtraLarge}
        weight={Contracts.TextWeight.Bold}
        color={Contracts.TextColor.Primary}
      >
        Namespaced approach for better organization
      </Text>
    </div>
  );
}

// ============================================================================
// Example 5: Builder Pattern Configuration
// ============================================================================

export function BuilderPatternExample() {
  // Create reusable configurations using builder pattern
  const primaryButtonConfig = createButtonConfig()
    .variant(ButtonVariant.Primary)
    .size(ComponentSize.Large)
    .build();
    
  const headingConfig = createTextConfig()
    .size(TextSize.ExtraLarge2)
    .weight(TextWeight.Bold)
    .color(TextColor.Primary)
    .as(TextElement.Heading1)
    .build();
  
  return (
    <div>
      <Text {...headingConfig}>
        Using Builder Pattern
      </Text>
      
      <Button {...primaryButtonConfig}>
        Configured Button
      </Button>
    </div>
  );
}

// ============================================================================
// Example 6: Runtime Option Discovery
// ============================================================================

export function RuntimeDiscoveryExample() {
  // Discover available options at runtime
  const buttonVariants = getContractOptions.buttonVariants();
  const textSizes = getContractOptions.textSizes();
  
  // Or use ComponentOptions for simpler discovery
  const cardVariants = ComponentOptions.Card.variants;
  
  return (
    <div>
      <h2>Runtime Option Discovery</h2>
      
      <div>
        <h3>All Button Variants:</h3>
        <Flex direction={FlexDirection.Row} gap={Spacing.Small}>
          {buttonVariants.map(variant => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </Flex>
      </div>
      
      <div>
        <h3>All Text Sizes:</h3>
        {textSizes.map(size => (
          <Text key={size} size={size}>
            Size: {size}
          </Text>
        ))}
      </div>
      
      <div>
        <h3>Card Variants from ComponentOptions:</h3>
        <Flex direction={FlexDirection.Column} gap={Spacing.Small}>
          {cardVariants.map(variant => (
            <Card key={variant} variant={variant} padding={CardPadding.Medium}>
              <Text>Card variant: {variant}</Text>
            </Card>
          ))}
        </Flex>
      </div>
    </div>
  );
}

// ============================================================================
// Example 7: Type Guards and Validation
// ============================================================================

export function TypeGuardExample() {
  const [inputValue, setInputValue] = React.useState('');
  const [validationMessage, setValidationMessage] = React.useState('');
  
  const validateInput = (value: string) => {
    if (isButtonVariant(value)) {
      setValidationMessage(`✅ "${value}" is a valid button variant`);
    } else {
      setValidationMessage(`❌ "${value}" is not a valid button variant`);
    }
  };
  
  return (
    <div>
      <h2>Type Guards and Validation</h2>
      
      <Input
        label="Test Button Variant"
        placeholder="Try: primary, secondary, outline, ghost"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          validateInput(e.target.value);
        }}
        helperText={validationMessage}
      />
      
      <Text color={TextColor.Info} size={TextSize.Small}>
        Valid options: {getContractOptions.buttonVariants().join(', ')}
      </Text>
    </div>
  );
}

// ============================================================================
// Example 8: Theme Integration with Type Contracts
// ============================================================================

export function ThemeIntegrationExample() {
  const { updateTheme } = useTheme();
  
  const customizeTheme = () => {
    updateTheme({
      components: {
        button: {
          colors: {
            [ButtonVariant.Primary]: {
              background: '#ff6b35',
              foreground: '#ffffff',
              hover: {
                background: '#e55a2b'
              }
            }
          }
        }
      }
    });
  };
  
  return (
    <div>
      <h2>Theme Integration</h2>
      
      <Button 
        variant={ButtonVariant.Primary}
        size={ComponentSize.Large}
        onClick={customizeTheme}
      >
        Apply Custom Theme
      </Button>
      
      <Box mt={Spacing.Medium}>
        <Text 
          color={TextColor.Secondary}
          size={TextSize.Small}
        >
          Click to see theme update with type-safe configuration
        </Text>
      </Box>
    </div>
  );
}

// ============================================================================
// Example 9: Responsive Design with Type Contracts
// ============================================================================

export function ResponsiveExample() {
  // Note: Responsive types are available but would need implementation
  // This shows the type-safe approach for responsive design
  
  const responsiveSize: ResponsiveSize = {
    base: ComponentSize.Small,
    md: ComponentSize.Medium,
    lg: ComponentSize.Large
  };
  
  const responsiveSpacing: ResponsiveSpacing = {
    base: Spacing.Small,
    md: Spacing.Medium,
    lg: Spacing.Large
  };
  
  return (
    <Box p={Spacing.Large}>
      <Text 
        size={TextSize.ExtraLarge}
        weight={TextWeight.Bold}
        color={TextColor.Primary}
      >
        Responsive Design Ready
      </Text>
      
      <Text color={TextColor.Secondary}>
        Type system supports responsive values for future implementation
      </Text>
      
      <Text color={TextColor.Info} size={TextSize.Small}>
        Example responsive config: {JSON.stringify(responsiveSize, null, 2)}
      </Text>
      
      {/* This would work once responsive system is implemented */}
      {/* <Button size={responsiveSize}>Responsive Button</Button> */}
    </Box>
  );
}

// ============================================================================
// Complete Demo Component
// ============================================================================

export function CompleteUsageDemo() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Text 
        as={TextElement.Heading1}
        size={TextSize.ExtraLarge4}
        weight={TextWeight.Bold}
        color={TextColor.Primary}
        align={TextAlign.Center}
      >
        BLUI Framework: Complete Usage Examples
      </Text>
      
      <Box mt={Spacing.Medium} mb={Spacing.ExtraLarge}>
        <Text 
          size={TextSize.Large}
          color={TextColor.Secondary}
          align={TextAlign.Center}
        >
          Demonstrating C#-like interfaces and type safety in React
        </Text>
      </Box>
      
      <Flex 
        direction={FlexDirection.Column}
        gap={Spacing.ExtraLarge}
      >
        <BasicTypeExamples />
        <AdvancedLayoutExample />
        <TypeSafeFormExample />
        <ContractsObjectExample />
        <BuilderPatternExample />
        <RuntimeDiscoveryExample />
        <TypeGuardExample />
        <ThemeIntegrationExample />
        <ResponsiveExample />
      </Flex>
    </div>
  );
}
