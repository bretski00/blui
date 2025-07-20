import { useState } from 'react';
import { 
  Button, 
  Input, 
  Card, 
  Text, 
  Box,
  Badge,
  Navbar,
  Grid, 
  Flex, 
  LayoutProvider
} from 'blui';

// Component options
const COMPONENTS = {
  Button: 'Button',
  Input: 'Input', 
  Card: 'Card',
  Text: 'Text',
  Box: 'Box',
  Badge: 'Badge',
  Navbar: 'Navbar'
} as const;

const LAYOUTS = {
  None: 'None',
  Grid: 'Grid',
  Flex: 'Flex'
} as const;

type ComponentName = keyof typeof COMPONENTS;
type LayoutName = keyof typeof LAYOUTS;

interface ComponentConfig {
  component: ComponentName;
  props: Record<string, any>;
}

interface LayoutConfig {
  layout: LayoutName;
  props: Record<string, any>;
}

// Default props for each component
const DEFAULT_COMPONENT_PROPS: Record<ComponentName, Record<string, any>> = {
  Button: {
    children: 'Click me',
    variant: 'primary',
    size: 'md'
  },
  Input: {
    placeholder: 'Enter text...',
    size: 'md'
  },
  Card: {
    children: 'Card content',
    padding: 'md'
  },
  Text: {
    children: 'Sample text',
    size: 'md'
  },
  Box: {
    children: 'Box content',
    padding: 'md'
  },
  Badge: {
    children: 'Badge',
    variant: 'default'
  },
  Navbar: {}
};

// Default props for layouts
const DEFAULT_LAYOUT_PROPS: Record<Exclude<LayoutName, 'None'>, Record<string, any>> = {
  Grid: {
    columns: 3,
    gap: 'md'
  },
  Flex: {
    direction: 'row',
    gap: 'md',
    justify: 'flex-start',
    align: 'flex-start'
  }
};

function ComponentRenderer({ config }: { config: ComponentConfig }) {
  const { component, props } = config;
  
  switch (component) {
    case 'Button':
      return <Button {...props} />;
    case 'Input':
      return <Input {...props} />;
    case 'Card':
      return <Card {...props} />;
    case 'Text':
      return <Text {...props} />;
    case 'Box':
      return <Box {...props} />;
    case 'Badge':
      return <Badge {...props} />;
    case 'Navbar':
      return <Navbar {...props} />;
    default:
      return <div>Unknown component</div>;
  }
}

function LayoutRenderer({ 
  layoutConfig, 
  componentConfigs 
}: { 
  layoutConfig: LayoutConfig;
  componentConfigs: ComponentConfig[];
}) {
  const { layout, props } = layoutConfig;
  
  const renderedComponents = componentConfigs.map((config, index) => (
    <ComponentRenderer key={index} config={config} />
  ));
  
  switch (layout) {
    case 'None':
      return <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {renderedComponents}
      </div>;
    case 'Grid':
      return <Grid {...props}>{renderedComponents}</Grid>;
    case 'Flex':
      return <Flex {...props}>{renderedComponents}</Flex>;
    default:
      return <div>{renderedComponents}</div>;
  }
}

function PropEditor({ 
  label, 
  value, 
  onChange, 
  type = 'text' 
}: {
  label: string;
  value: any;
  onChange: (value: any) => void;
  type?: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
}) {
  return (
    <Box style={{ marginBottom: '0.75rem' }}>
      <Text size="sm" weight="medium" style={{ marginBottom: '0.25rem' }}>
        {label}
      </Text>
      {type === 'boolean' ? (
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
      ) : type === 'number' ? (
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          size="sm"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          size="sm"
        />
      )}
    </Box>
  );
}

export function ComponentPlaygroundPage() {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    layout: 'None',
    props: {}
  });
  
  const [componentConfigs, setComponentConfigs] = useState<ComponentConfig[]>([
    {
      component: 'Button',
      props: { ...DEFAULT_COMPONENT_PROPS.Button }
    }
  ]);

  const handleLayoutChange = (layout: LayoutName) => {
    setLayoutConfig({
      layout,
      props: layout === 'None' ? {} : { ...DEFAULT_LAYOUT_PROPS[layout] }
    });
  };

  const handleLayoutPropChange = (propName: string, value: any) => {
    setLayoutConfig(prev => ({
      ...prev,
      props: {
        ...prev.props,
        [propName]: value
      }
    }));
  };

  const handleComponentChange = (index: number, component: ComponentName) => {
    setComponentConfigs(prev => 
      prev.map((config, i) => 
        i === index 
          ? { 
              component, 
              props: { ...DEFAULT_COMPONENT_PROPS[component] } 
            }
          : config
      )
    );
  };

  const handleComponentPropChange = (index: number, propName: string, value: any) => {
    setComponentConfigs(prev =>
      prev.map((config, i) =>
        i === index
          ? {
              ...config,
              props: {
                ...config.props,
                [propName]: value
              }
            }
          : config
      )
    );
  };

  const addComponent = () => {
    setComponentConfigs(prev => [
      ...prev,
      {
        component: 'Button',
        props: { ...DEFAULT_COMPONENT_PROPS.Button }
      }
    ]);
  };

  const removeComponent = (index: number) => {
    setComponentConfigs(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <LayoutProvider>
      <Box style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Text as="h1" size="2xl" weight="bold" style={{ marginBottom: '2rem' }}>
          Component Playground
        </Text>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          {/* Controls Panel */}
          <Card padding="lg">
            <Text as="h2" size="lg" weight="semibold" style={{ marginBottom: '1.5rem' }}>
              Controls
            </Text>
            
            {/* Layout Selection */}
            <Box style={{ marginBottom: '1.5rem' }}>
              <Text size="base" weight="medium" style={{ marginBottom: '0.5rem' }}>
                Layout
              </Text>
              <select
                value={layoutConfig.layout}
                onChange={(e) => handleLayoutChange(e.target.value as LayoutName)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem'
                }}
              >
                {Object.entries(LAYOUTS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </Box>

            {/* Layout Props */}
            {layoutConfig.layout !== 'None' && (
              <Box style={{ marginBottom: '1.5rem' }}>
                <Text size="sm" weight="medium" style={{ marginBottom: '0.5rem' }}>
                  Layout Properties
                </Text>
                {layoutConfig.layout === 'Grid' && (
                  <>
                    <PropEditor
                      label="Columns"
                      value={layoutConfig.props.columns || 3}
                      onChange={(value) => handleLayoutPropChange('columns', value)}
                      type="number"
                    />
                    <PropEditor
                      label="Gap"
                      value={layoutConfig.props.gap || 'md'}
                      onChange={(value) => handleLayoutPropChange('gap', value)}
                    />
                  </>
                )}
                {layoutConfig.layout === 'Flex' && (
                  <>
                    <PropEditor
                      label="Direction"
                      value={layoutConfig.props.direction || 'row'}
                      onChange={(value) => handleLayoutPropChange('direction', value)}
                    />
                    <PropEditor
                      label="Gap"
                      value={layoutConfig.props.gap || 'md'}
                      onChange={(value) => handleLayoutPropChange('gap', value)}
                    />
                    <PropEditor
                      label="Justify"
                      value={layoutConfig.props.justify || 'flex-start'}
                      onChange={(value) => handleLayoutPropChange('justify', value)}
                    />
                    <PropEditor
                      label="Align"
                      value={layoutConfig.props.align || 'flex-start'}
                      onChange={(value) => handleLayoutPropChange('align', value)}
                    />
                  </>
                )}
              </Box>
            )}

            {/* Components */}
            <Box style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <Text size="base" weight="medium">
                  Components
                </Text>
                <Button size="sm" onClick={addComponent}>
                  Add Component
                </Button>
              </div>
              
              {componentConfigs.map((config, index) => (
                <Card key={index} padding="md" style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <Text size="sm" weight="medium">
                      Component #{index + 1}
                    </Text>
                    {componentConfigs.length > 1 && (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        onClick={() => removeComponent(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <select
                    value={config.component}
                    onChange={(e) => handleComponentChange(index, e.target.value as ComponentName)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      marginBottom: '0.75rem'
                    }}
                  >
                    {Object.entries(COMPONENTS).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>

                  {/* Component-specific props */}
                  {config.component === 'Button' && (
                    <>
                      <PropEditor
                        label="Text"
                        value={config.props.children || ''}
                        onChange={(value) => handleComponentPropChange(index, 'children', value)}
                      />
                      <PropEditor
                        label="Variant"
                        value={config.props.variant || 'primary'}
                        onChange={(value) => handleComponentPropChange(index, 'variant', value)}
                      />
                      <PropEditor
                        label="Size"
                        value={config.props.size || 'md'}
                        onChange={(value) => handleComponentPropChange(index, 'size', value)}
                      />
                    </>
                  )}
                  
                  {config.component === 'Input' && (
                    <>
                      <PropEditor
                        label="Placeholder"
                        value={config.props.placeholder || ''}
                        onChange={(value) => handleComponentPropChange(index, 'placeholder', value)}
                      />
                      <PropEditor
                        label="Size"
                        value={config.props.size || 'md'}
                        onChange={(value) => handleComponentPropChange(index, 'size', value)}
                      />
                    </>
                  )}
                  
                  {config.component === 'Text' && (
                    <>
                      <PropEditor
                        label="Content"
                        value={config.props.children || ''}
                        onChange={(value) => handleComponentPropChange(index, 'children', value)}
                      />
                      <PropEditor
                        label="Size"
                        value={config.props.size || 'md'}
                        onChange={(value) => handleComponentPropChange(index, 'size', value)}
                      />
                    </>
                  )}
                  
                  {config.component === 'Card' && (
                    <>
                      <PropEditor
                        label="Content"
                        value={config.props.children || ''}
                        onChange={(value) => handleComponentPropChange(index, 'children', value)}
                      />
                      <PropEditor
                        label="Padding"
                        value={config.props.padding || 'md'}
                        onChange={(value) => handleComponentPropChange(index, 'padding', value)}
                      />
                    </>
                  )}
                  
                  {config.component === 'Box' && (
                    <>
                      <PropEditor
                        label="Content"
                        value={config.props.children || ''}
                        onChange={(value) => handleComponentPropChange(index, 'children', value)}
                      />
                      <PropEditor
                        label="Padding"
                        value={config.props.padding || 'md'}
                        onChange={(value) => handleComponentPropChange(index, 'padding', value)}
                      />
                    </>
                  )}
                  
                  {config.component === 'Badge' && (
                    <>
                      <PropEditor
                        label="Text"
                        value={config.props.children || ''}
                        onChange={(value) => handleComponentPropChange(index, 'children', value)}
                      />
                      <PropEditor
                        label="Variant"
                        value={config.props.variant || 'default'}
                        onChange={(value) => handleComponentPropChange(index, 'variant', value)}
                      />
                    </>
                  )}
                </Card>
              ))}
            </Box>
          </Card>

          {/* Preview Panel */}
          <Card padding="lg">
            <Text as="h2" size="lg" weight="semibold" style={{ marginBottom: '1.5rem' }}>
              Preview
            </Text>
            
            <Box 
              style={{ 
                border: '2px dashed #e5e7eb',
                borderRadius: '0.5rem',
                padding: '2rem',
                minHeight: '300px',
                backgroundColor: '#fafafa'
              }}
            >
              <LayoutRenderer 
                layoutConfig={layoutConfig}
                componentConfigs={componentConfigs}
              />
            </Box>
          </Card>
        </div>
      </Box>
    </LayoutProvider>
  );
}
