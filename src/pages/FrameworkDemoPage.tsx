import { 
  Box, 
  Button, 
  Card, 
  Text, 
  Badge,
  Flex,
  FlexItem,
  Input,
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
  Contracts,
  ComponentOptions,
  createButtonConfig,
  createTextConfig,
  useTheme 
} from '../index';

export function FrameworkDemoPage() {
  const { updateTheme } = useTheme();
  
  // Demonstrate builder pattern
  const primaryButtonConfig = createButtonConfig()
    .variant(ButtonVariant.Primary)
    .size(ComponentSize.Large)
    .build();
    
  const headingConfig = createTextConfig()
    .size(TextSize.ExtraLarge3)
    .weight(TextWeight.Bold)
    .color(TextColor.Primary)
    .as(TextElement.Heading1)
    .build();

  const applyCustomTheme = () => {
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
    <Box p={Spacing.Large}>
      <Text {...headingConfig} align={TextAlign.Center}>
        BLUI Framework Demo
      </Text>
      
      <Box mt={Spacing.Medium} mb={Spacing.ExtraLarge}>
        <Text 
          size={TextSize.Large}
          color={TextColor.Secondary}
          align={TextAlign.Center}
        >
          C#-like interfaces and type safety for React components
        </Text>
      </Box>

      <Flex direction={FlexDirection.Column} gap={Spacing.ExtraLarge}>
        
        {/* Type-Safe Components Section */}
        <Card variant={CardVariant.Elevated} padding={CardPadding.Large}>
          <Text 
            as={TextElement.Heading2}
            size={TextSize.ExtraLarge}
            weight={TextWeight.Bold}
            color={TextColor.Primary}
          >
            1. Type-Safe Component Usage
          </Text>
          
          <Box mt={Spacing.Medium}>
            <Text color={TextColor.Secondary}>
              Components use type contracts instead of magic strings:
            </Text>
          </Box>
          
          <Box mt={Spacing.Medium}>
            <Flex direction={FlexDirection.Row} gap={Spacing.Medium}>
              <Button variant={ButtonVariant.Primary} size={ComponentSize.Large}>
                Primary
              </Button>
              <Button variant={ButtonVariant.Secondary} size={ComponentSize.Medium}>
                Secondary
              </Button>
              <Button variant={ButtonVariant.Outline} size={ComponentSize.Small}>
                Outline
              </Button>
              <Button variant={ButtonVariant.Ghost}>
                Ghost
              </Button>
            </Flex>
          </Box>

          <Box mt={Spacing.Medium}>
            <Flex direction={FlexDirection.Row} gap={Spacing.Small}>
              <Badge variant={ComponentVariant.Success}>Active</Badge>
              <Badge variant={ComponentVariant.Warning}>Pending</Badge>
              <Badge variant={ComponentVariant.Error}>Error</Badge>
              <Badge variant={ComponentVariant.Primary} outline>Outlined</Badge>
            </Flex>
          </Box>
        </Card>

        {/* Typography Section */}
        <Card variant={CardVariant.Outlined} padding={CardPadding.Large}>
          <Text 
            as={TextElement.Heading2}
            size={TextSize.ExtraLarge}
            weight={TextWeight.Bold}
            color={TextColor.Primary}
          >
            2. Typography System
          </Text>
          
          <Box mt={Spacing.Medium}>
            <Text size={TextSize.ExtraLarge4} weight={TextWeight.Bold}>
              Extra Large (4xl)
            </Text>
            <Text size={TextSize.ExtraLarge3} weight={TextWeight.Bold}>
              Extra Large (3xl)
            </Text>
            <Text size={TextSize.ExtraLarge2} weight={TextWeight.SemiBold}>
              Extra Large (2xl)
            </Text>
            <Text size={TextSize.ExtraLarge} weight={TextWeight.Medium}>
              Extra Large (xl)
            </Text>
            <Text size={TextSize.Large}>Large (lg)</Text>
            <Text size={TextSize.Base}>Base (default)</Text>
            <Text size={TextSize.Small} color={TextColor.Secondary}>
              Small (sm)
            </Text>
            <Text size={TextSize.ExtraSmall} color={TextColor.Disabled}>
              Extra Small (xs)
            </Text>
          </Box>
        </Card>

        {/* Layout System Section */}
        <Card variant={CardVariant.Filled} padding={CardPadding.Large}>
          <Text 
            as={TextElement.Heading2}
            size={TextSize.ExtraLarge}
            weight={TextWeight.Bold}
            color={TextColor.Primary}
          >
            3. Flex Layout System
          </Text>
          
          <Box mt={Spacing.Medium}>
            <Box mb={Spacing.Medium}>
              <Text color={TextColor.Secondary}>
                Type-safe flex layouts with intelligent spacing:
              </Text>
            </Box>
            
            <Flex 
              direction={FlexDirection.Row}
              justify={FlexJustify.SpaceBetween}
              align={FlexAlign.Center}
              gap={Spacing.Medium}
            >
              <FlexItem flex="1">
                <Card variant={CardVariant.Outlined} padding={CardPadding.Medium}>
                  <Text align={TextAlign.Center}>Flexible</Text>
                </Card>
              </FlexItem>
              
              <FlexItem>
                <Card variant={CardVariant.Outlined} padding={CardPadding.Medium}>
                  <Text align={TextAlign.Center}>Fixed</Text>
                </Card>
              </FlexItem>
              
              <FlexItem flex="2">
                <Card variant={CardVariant.Outlined} padding={CardPadding.Medium}>
                  <Text align={TextAlign.Center}>Double Flex</Text>
                </Card>
              </FlexItem>
            </Flex>
          </Box>
        </Card>

        {/* Builder Pattern Section */}
        <Card variant={CardVariant.Elevated} padding={CardPadding.Large}>
          <Text 
            as={TextElement.Heading2}
            size={TextSize.ExtraLarge}
            weight={TextWeight.Bold}
            color={TextColor.Primary}
          >
            4. Builder Pattern Configuration
          </Text>
          
          <Box mt={Spacing.Medium}>
            <Text color={TextColor.Secondary}>
              Create reusable component configurations:
            </Text>
            
            <Box mt={Spacing.Medium}>
              <Button {...primaryButtonConfig}>
                Configured with Builder
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Contracts Object Section */}
        <Card variant={CardVariant.Outlined} padding={CardPadding.Large}>
          <Text 
            as={TextElement.Heading2}
            size={TextSize.ExtraLarge}
            weight={TextWeight.Bold}
            color={TextColor.Primary}
          >
            5. Contracts Object (Alternative Import)
          </Text>
          
          <Box mt={Spacing.Medium}>
            <Text color={TextColor.Secondary}>
              Use the Contracts object for namespace organization:
            </Text>
            
            <Box mt={Spacing.Medium}>
              <Button 
                variant={Contracts.ButtonVariant.Primary}
                size={Contracts.ComponentSize.Large}
              >
                Using Contracts Object
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Runtime Discovery Section */}
        <Card variant={CardVariant.Filled} padding={CardPadding.Large}>
          <Text 
            as={TextElement.Heading2}
            size={TextSize.ExtraLarge}
            weight={TextWeight.Bold}
            color={TextColor.Primary}
          >
            6. Runtime Option Discovery
          </Text>
          
          <Box mt={Spacing.Medium}>
            <Text color={TextColor.Secondary}>
              Discover available options at runtime:
            </Text>
            
            <Box mt={Spacing.Medium}>
              <Text size={TextSize.Small} color={TextColor.Info}>
                Button variants: {ComponentOptions.Button.variants.join(', ')}
              </Text>
              <Text size={TextSize.Small} color={TextColor.Info}>
                Card variants: {ComponentOptions.Card.variants.join(', ')}
              </Text>
              <Text size={TextSize.Small} color={TextColor.Info}>
                Component sizes: {ComponentOptions.Common.sizes.join(', ')}
              </Text>
            </Box>
          </Box>
        </Card>

        {/* Form Example Section */}
        <Card variant={CardVariant.Elevated} padding={CardPadding.Large}>
          <Text 
            as={TextElement.Heading2}
            size={TextSize.ExtraLarge}
            weight={TextWeight.Bold}
            color={TextColor.Primary}
          >
            7. Type-Safe Form Components
          </Text>
          
          <Box mt={Spacing.Medium}>
            <Input
              label="Email Address"
              type="email"
              size={ComponentSize.Large}
              placeholder="Enter your email"
              helperText="We'll never share your email"
            />
            
            <Box mt={Spacing.Medium}>
              <Input
                label="Password"
                type="password"
                size={ComponentSize.Medium}
                placeholder="Create a password"
                helperText="Minimum 8 characters"
              />
            </Box>
          </Box>
        </Card>

        {/* Theme Integration Section */}
        <Card variant={CardVariant.Outlined} padding={CardPadding.Large}>
          <Text 
            as={TextElement.Heading2}
            size={TextSize.ExtraLarge}
            weight={TextWeight.Bold}
            color={TextColor.Primary}
          >
            8. Dynamic Theme Updates
          </Text>
          
          <Box mt={Spacing.Medium}>
            <Text color={TextColor.Secondary}>
              Update themes with type-safe configuration:
            </Text>
            
            <Box mt={Spacing.Medium}>
              <Button 
                variant={ButtonVariant.Primary}
                size={ComponentSize.Large}
                onClick={applyCustomTheme}
              >
                Apply Custom Theme
              </Button>
            </Box>
            
            <Box mt={Spacing.Medium}>
              <Text 
                color={TextColor.Secondary}
                size={TextSize.Small}
              >
                Click to see theme update with type-safe configuration
              </Text>
            </Box>
          </Box>
        </Card>

        {/* Developer Benefits Summary */}
        <Card variant={CardVariant.Filled} padding={CardPadding.Large}>
          <Text 
            as={TextElement.Heading2}
            size={TextSize.ExtraLarge}
            weight={TextWeight.Bold}
            color={TextColor.Primary}
          >
            Developer Experience Benefits
          </Text>
          
          <Box mt={Spacing.Medium}>
            <Flex direction={FlexDirection.Column} gap={Spacing.Small}>
              <Text>✅ <strong>IntelliSense Support</strong> - Full autocomplete in your IDE</Text>
              <Text>✅ <strong>Compile-time Safety</strong> - Catch errors before runtime</Text>
              <Text>✅ <strong>Rich Documentation</strong> - JSDoc comments for every option</Text>
              <Text>✅ <strong>Easy Refactoring</strong> - Rename operations work across codebase</Text>
              <Text>✅ <strong>Consistency</strong> - Standardized naming patterns</Text>
              <Text>✅ <strong>Type Guards</strong> - Runtime validation helpers</Text>
              <Text>✅ <strong>Builder Patterns</strong> - Fluent configuration APIs</Text>
              <Text>✅ <strong>Runtime Discovery</strong> - Explore options programmatically</Text>
            </Flex>
          </Box>
        </Card>
      </Flex>
    </Box>
  );
}
