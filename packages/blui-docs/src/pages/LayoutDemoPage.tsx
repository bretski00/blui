import { 
  Grid, 
  GridItem, 
  Flex, 
  FlexItem, 
  LayoutProvider,
  Card, 
  Text, 
  Button,
  Badge,
  Box
} from 'blui';

export function LayoutDemoPage() {
  return (
    <LayoutProvider>
      <Box p="xl" maxW="1200px" mx="auto">
        <Text as="h1" size="4xl" weight="bold" align="center" style={{ marginBottom: '2rem' }}>
          🏗️ Layout Components
        </Text>
        
        <Text size="lg" color="secondary" align="center" style={{ marginBottom: '3rem' }}>
          Flexible Grid and Flex layouts with theme integration
        </Text>

        {/* Grid Layout Section */}
        <Card padding="lg" style={{ marginBottom: '2rem' }}>
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1.5rem' }}>
            Grid Layout
          </Text>

          {/* Basic Grid */}
          <Box style={{ marginBottom: '2rem' }}>
            <Text size="lg" weight="medium" style={{ marginBottom: '1rem' }}>
              Basic 3-Column Grid
            </Text>
            <Grid columns="3" gap="md">
              <Card padding="md">
                <Text weight="medium" color="primary">Grid Item 1</Text>
                <Text size="sm" color="secondary">Equal width column</Text>
              </Card>
              <Card padding="md">
                <Text weight="medium" color="primary">Grid Item 2</Text>
                <Text size="sm" color="secondary">Equal width column</Text>
              </Card>
              <Card padding="md">
                <Text weight="medium" color="primary">Grid Item 3</Text>
                <Text size="sm" color="secondary">Equal width column</Text>
              </Card>
            </Grid>
          </Box>

          {/* Auto-fit Grid */}
          <Box style={{ marginBottom: '2rem' }}>
            <Text size="lg" weight="medium" style={{ marginBottom: '1rem' }}>
              Auto-fit Grid (Responsive)
            </Text>
            <Grid autoFit autoFitMinWidth="200px" gap="lg">
              <Card padding="md">
                <Badge variant="primary" style={{ marginBottom: '0.5rem' }}>Featured</Badge>
                <Text weight="medium">Responsive Card 1</Text>
                <Text size="sm" color="secondary">Automatically adjusts to available space</Text>
              </Card>
              <Card padding="md">
                <Badge variant="success" style={{ marginBottom: '0.5rem' }}>Popular</Badge>
                <Text weight="medium">Responsive Card 2</Text>
                <Text size="sm" color="secondary">Minimum 200px width</Text>
              </Card>
              <Card padding="md">
                <Badge variant="warning" style={{ marginBottom: '0.5rem' }}>New</Badge>
                <Text weight="medium">Responsive Card 3</Text>
                <Text size="sm" color="secondary">Wraps to new line when needed</Text>
              </Card>
              <Card padding="md">
                <Badge variant="error" style={{ marginBottom: '0.5rem' }}>Limited</Badge>
                <Text weight="medium">Responsive Card 4</Text>
                <Text size="sm" color="secondary">Perfect for dashboards</Text>
              </Card>
            </Grid>
          </Box>

          {/* Grid with Spanning */}
          <Box>
            <Text size="lg" weight="medium" style={{ marginBottom: '1rem' }}>
              Grid with Column Spanning
            </Text>
            <Grid columns="4" gap="md">
              <GridItem column="1 / 3">
                <Card padding="md" style={{ height: '100%' }}>
                  <Text weight="medium" color="primary">Spans 2 Columns</Text>
                  <Text size="sm" color="secondary">Using GridItem with column prop</Text>
                </Card>
              </GridItem>
              <Card padding="md">
                <Text weight="medium">Column 3</Text>
                <Text size="sm" color="secondary">Regular column</Text>
              </Card>
              <Card padding="md">
                <Text weight="medium">Column 4</Text>
                <Text size="sm" color="secondary">Regular column</Text>
              </Card>
            </Grid>
          </Box>
        </Card>

        {/* Flex Layout Section */}
        <Card padding="lg" style={{ marginBottom: '2rem' }}>
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1.5rem' }}>
            Flex Layout
          </Text>

          {/* Basic Flex Row */}
          <Box style={{ marginBottom: '2rem' }}>
            <Text size="lg" weight="medium" style={{ marginBottom: '1rem' }}>
              Flex Row with Gap
            </Text>
            <Flex direction="row" gap="md" align="center">
              <Button variant="primary">Primary Action</Button>
              <Button variant="outline">Secondary</Button>
              <Button variant="ghost">Tertiary</Button>
            </Flex>
          </Box>

          {/* Flex with Justification */}
          <Box style={{ marginBottom: '2rem' }}>
            <Text size="lg" weight="medium" style={{ marginBottom: '1rem' }}>
              Flex with Space Between
            </Text>
            <Flex justify="between" align="center" style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <Text weight="medium">Dashboard Header</Text>
              <Flex gap="sm">
                <Badge variant="success">Online</Badge>
                <Button variant="outline" size="sm">Settings</Button>
              </Flex>
            </Flex>
          </Box>

          {/* Flex Column */}
          <Box style={{ marginBottom: '2rem' }}>
            <Text size="lg" weight="medium" style={{ marginBottom: '1rem' }}>
              Flex Column Layout
            </Text>
            <Flex direction="column" gap="md" style={{ maxWidth: '300px' }}>
              <Card padding="md">
                <Text weight="medium">Step 1</Text>
                <Text size="sm" color="secondary">Choose your plan</Text>
              </Card>
              <Card padding="md">
                <Text weight="medium">Step 2</Text>
                <Text size="sm" color="secondary">Enter your details</Text>
              </Card>
              <Card padding="md">
                <Text weight="medium">Step 3</Text>
                <Text size="sm" color="secondary">Complete setup</Text>
              </Card>
            </Flex>
          </Box>

          {/* Flex Items */}
          <Box>
            <Text size="lg" weight="medium" style={{ marginBottom: '1rem' }}>
              Flex Items with Custom Flex Values
            </Text>
            <Flex gap="md" style={{ height: '100px' }}>
              <FlexItem flex="1">
                <Card padding="md" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text weight="medium">Flex: 1 (grows)</Text>
                </Card>
              </FlexItem>
              <FlexItem>
                <Card padding="md" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text weight="medium">Fixed Size</Text>
                </Card>
              </FlexItem>
              <FlexItem flex="2">
                <Card padding="md" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text weight="medium">Flex: 2 (grows more)</Text>
                </Card>
              </FlexItem>
            </Flex>
          </Box>
        </Card>

        {/* Combined Layout Example */}
        <Card padding="lg">
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1.5rem' }}>
            Combined Layout Example
          </Text>
          <Text color="secondary" style={{ marginBottom: '1.5rem' }}>
            Using both Grid and Flex together for complex layouts
          </Text>

          <Grid columns="3" gap="lg">
            {/* Sidebar */}
            <Card padding="md">
              <Text weight="semibold" style={{ marginBottom: '1rem' }}>Navigation</Text>
              <Flex direction="column" gap="sm">
                <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>Dashboard</Button>
                <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>Analytics</Button>
                <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>Settings</Button>
              </Flex>
            </Card>

            {/* Main Content - spans 2 columns */}
            <GridItem column="2 / 4">
              <Flex direction="column" gap="md">
                {/* Header */}
                <Flex justify="between" align="center">
                  <Text size="xl" weight="semibold">Main Content</Text>
                  <Badge variant="primary">Pro</Badge>
                </Flex>

                {/* Content Grid */}
                <Grid columns="2" gap="md">
                  <Card padding="md">
                    <Text weight="medium" style={{ marginBottom: '0.5rem' }}>Statistics</Text>
                    <Text size="2xl" weight="bold" color="primary">12,345</Text>
                    <Text size="sm" color="success">+12% from last month</Text>
                  </Card>
                  <Card padding="md">
                    <Text weight="medium" style={{ marginBottom: '0.5rem' }}>Revenue</Text>
                    <Text size="2xl" weight="bold" color="primary">$45,678</Text>
                    <Text size="sm" color="success">+8% from last month</Text>
                  </Card>
                </Grid>

                {/* Action Bar */}
                <Flex gap="md" justify="end">
                  <Button variant="outline">Export</Button>
                  <Button variant="primary">Create New</Button>
                </Flex>
              </Flex>
            </GridItem>
          </Grid>
        </Card>
      </Box>
    </LayoutProvider>
  );
}
