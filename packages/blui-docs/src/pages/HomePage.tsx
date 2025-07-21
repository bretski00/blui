import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Card, 
  Text, 
  Box, 
  Flex,
  Button,
  TextSize,
  TextWeight,
  CardPadding,
  FlexDirection,
  FlexJustify,
  FlexAlign,
  ButtonVariant,
  ComponentSize
} from 'blui';

export function HomePage() {
  const sampleCode = `import { ThemeProvider, Button, Card, Text } from 'blui';

function App() {
  return (
    <ThemeProvider>
      <Card padding="lg">
        <Text as="h1" size="2xl" weight="bold">
          Welcome to BLUI
        </Text>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Card>
    </ThemeProvider>
  );
}`;

  const installCode = `npm install blui`;

  return (
    <Box p="lg">
      <Flex 
        direction={FlexDirection.Column} 
        justify={FlexJustify.Center} 
        align={FlexAlign.Center}
        style={{ minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* Header Section */}
        <Box style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Text 
            as="p" 
            size={TextSize.Large} 
            style={{ color: '#64748b', marginBottom: '32px' }}
          >
            A React component library with extensible theme system
          </Text>
          
          {/* GitHub Links */}
          <Flex justify={FlexJustify.Center} style={{ gap: '16px', marginBottom: '48px' }}>
            <Button
              variant={ButtonVariant.Primary}
              size={ComponentSize.Large}
              onClick={() => window.open('https://github.com/bretski00/blui', '_blank')}
            >
              View on GitHub
            </Button>
            <Button
              variant={ButtonVariant.Secondary}
              size={ComponentSize.Large}
              onClick={() => window.open('https://github.com/bretski00/blui/blob/main/README.md', '_blank')}
            >
              Documentation
            </Button>
          </Flex>
        </Box>

        {/* Quick Start Section */}
        <Card padding={CardPadding.Large} style={{ width: '100%', marginBottom: '32px' }}>
          <Text 
            as="h2" 
            size={TextSize.ExtraLarge} 
            weight={TextWeight.SemiBold}
            style={{ marginBottom: '24px' }}
          >
            🚀 Quick Start
          </Text>
          
          {/* <Text 
            as="h3" 
            size={TextSize.Large} 
            weight={TextWeight.Medium}
            style={{ marginBottom: '12px' }}
          >
            Installation, installed in GitHub packages, not yet in NPM
          </Text>
          <Box style={{ marginBottom: '24px' }}>
            <SyntaxHighlighter
              language="bash"
              style={tomorrow}
              customStyle={{
                borderRadius: '8px',
                fontSize: '14px',
                margin: 0
              }}
            >
              {installCode}
            </SyntaxHighlighter>
          </Box> */}

          <Text 
            as="h3" 
            size={TextSize.Large} 
            weight={TextWeight.Medium}
            style={{ marginBottom: '12px' }}
          >
            Basic Usage
          </Text>
          <SyntaxHighlighter
            language="tsx"
            style={tomorrow}
            customStyle={{
              borderRadius: '8px',
              fontSize: '14px',
              margin: 0
            }}
          >
            {sampleCode}
          </SyntaxHighlighter>
        </Card>

        {/* Features Section */}
        <Card padding={CardPadding.Large} style={{ width: '100%', marginBottom: '32px' }}>
          <Text 
            as="h2" 
            size={TextSize.ExtraLarge} 
            weight={TextWeight.SemiBold}
            style={{ marginBottom: '24px' }}
          >
            ✨ Features
          </Text>
          
          <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <Box>
              <Text as="h4" size={TextSize.Large} weight={TextWeight.SemiBold} style={{ marginBottom: '8px' }}>
                🎨 Extensible Theme System
              </Text>
              <Text size={TextSize.Small} style={{ color: '#64748b' }}>
                Customize every aspect of component styling
              </Text>
            </Box>
            
            <Box>
              <Text as="h4" size={TextSize.Large} weight={TextWeight.SemiBold} style={{ marginBottom: '8px' }}>
                🔧 Layout Provider
              </Text>
              <Text size={TextSize.Small} style={{ color: '#64748b' }}>
                Spatial configuration for different layout contexts
              </Text>
            </Box>
            
            <Box>
              <Text as="h4" size={TextSize.Large} weight={TextWeight.SemiBold} style={{ marginBottom: '8px' }}>
                📱 Responsive Design
              </Text>
              <Text size={TextSize.Small} style={{ color: '#64748b' }}>
                Built-in breakpoint system
              </Text>
            </Box>
            
            <Box>
              <Text as="h4" size={TextSize.Large} weight={TextWeight.SemiBold} style={{ marginBottom: '8px' }}>
                💪 TypeScript Support
              </Text>
              <Text size={TextSize.Small} style={{ color: '#64748b' }}>
                Full type safety and IntelliSense
              </Text>
            </Box>
          </Box>
        </Card>

        {/* Documentation Links */}
        <Card padding={CardPadding.Large} style={{ width: '100%' }}>
          <Text 
            as="h2" 
            size={TextSize.ExtraLarge} 
            weight={TextWeight.SemiBold}
            style={{ marginBottom: '24px' }}
          >
            📚 Documentation & Resources
          </Text>
          
          <Flex style={{ gap: '16px', flexWrap: 'wrap' }}>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={() => window.open('https://github.com/bretski00/blui/tree/main/docs/components', '_blank')}
            >
              Component Docs
            </Button>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={() => window.open('https://github.com/bretski00/blui/tree/main/docs/themes', '_blank')}
            >
              Theme System
            </Button>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={() => window.open('https://github.com/bretski00/blui/tree/main/docs/layouts', '_blank')}
            >
              Layout System
            </Button>
            <Button
              variant={ButtonVariant.Secondary}
              onClick={() => window.open('https://github.com/bretski00/blui/blob/main/CHANGELOG.md', '_blank')}
            >
              Changelog
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Box>
  );
}
