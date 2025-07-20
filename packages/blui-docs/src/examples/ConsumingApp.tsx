// Example of how a consuming application would use the UI framework

import {
  ThemeProvider,
  Button,
  Input,
  Card,
  Text,
  Box,
  useTheme,
  type ThemeOverride,
} from 'blui'; // This would be your npm package

// Define your application's custom theme
const appTheme: ThemeOverride = {
  colors: {
    primary: '#6366f1', // Indigo
    secondary: '#ec4899', // Pink
    success: '#059669', // Emerald
    background: '#f8fafc', // Slate 50
    surface: '#ffffff',
  },
  typography: {
    fontFamily: {
      primary: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
  },
  components: {
    button: {
      borderRadius: '8px',
      colors: {
        primary: {
          background: '#6366f1',
          backgroundHover: '#4f46e5',
          backgroundActive: '#3730a3',
          text: '#ffffff',
          border: '#6366f1',
        },
      },
    },
    card: {
      borderRadius: '12px',
      shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
  },
};

// Component demonstrating theme consumption
function Dashboard() {
  const { theme, updateTheme } = useTheme();

  const handleThemeToggle = () => {
    const isDark = theme.colors.background === '#1f2937';
    
    if (isDark) {
      // Switch to light theme
      updateTheme({
        colors: {
          background: '#f8fafc',
          surface: '#ffffff',
          text: {
            primary: '#1f2937',
            secondary: '#6b7280',
          },
        },
      });
    } else {
      // Switch to dark theme
      updateTheme({
        colors: {
          background: '#1f2937',
          surface: '#374151',
          text: {
            primary: '#f9fafb',
            secondary: '#d1d5db',
          },
        },
      });
    }
  };

  return (
    <Box p="xl" minH="100vh">
      <Box maxW="1200px" mx="auto">
        {/* Header */}
        <Box 
          display="flex" 
          style={{ 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '2rem' 
          }}
        >
          <Text as="h1" size="3xl" weight="bold">
            My Application Dashboard
          </Text>
          <Button variant="outline" onClick={handleThemeToggle}>
            Toggle Theme
          </Button>
        </Box>

        {/* Main content grid */}
        <Box 
          display="grid" 
          style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}
        >
          {/* Stats cards */}
          <Card padding="lg">
            <Text size="sm" color="secondary" weight="medium">
              Total Users
            </Text>
            <Text size="3xl" weight="bold" color="primary">
              12,345
            </Text>
            <Text size="sm" color="success">
              +12% from last month
            </Text>
          </Card>

          <Card padding="lg">
            <Text size="sm" color="secondary" weight="medium">
              Revenue
            </Text>
            <Text size="3xl" weight="bold" color="primary">
              $45,678
            </Text>
            <Text size="sm" color="success">
              +8% from last month
            </Text>
          </Card>

          <Card padding="lg">
            <Text size="sm" color="secondary" weight="medium">
              Conversion Rate
            </Text>
            <Text size="3xl" weight="bold" color="primary">
              3.2%
            </Text>
            <Text size="sm" color="secondary">
              -0.1% from last month
            </Text>
          </Card>
        </Box>

        {/* Form section */}
        <Card padding="lg" style={{ marginBottom: '2rem' }}>
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
            Create New User
          </Text>
          
          <Box display="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="First Name"
              placeholder="Enter first name"
              size="md"
            />
            <Input
              label="Last Name"
              placeholder="Enter last name"
              size="md"
            />
          </Box>
          
          <Box style={{ marginTop: '1rem' }}>
            <Input
              label="Email Address"
              type="email"
              placeholder="user@example.com"
              size="md"
            />
          </Box>
          
          <Box 
            display="flex" 
            style={{ 
              gap: '1rem', 
              marginTop: '1.5rem',
              justifyContent: 'flex-end'
            }}
          >
            <Button variant="outline">
              Cancel
            </Button>
            <Button variant="primary">
              Create User
            </Button>
          </Box>
        </Card>

        {/* Data table */}
        <Card padding="lg">
          <Text as="h2" size="xl" weight="semibold" style={{ marginBottom: '1rem' }}>
            Recent Users
          </Text>
          
          <Box style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                    <Text weight="medium" color="secondary">Name</Text>
                  </th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                    <Text weight="medium" color="secondary">Email</Text>
                  </th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                    <Text weight="medium" color="secondary">Status</Text>
                  </th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid #e5e7eb' }}>
                    <Text weight="medium" color="secondary">Actions</Text>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'John Doe', email: 'john@example.com', status: 'Active' },
                  { name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
                  { name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
                ].map((user, index) => (
                  <tr key={index}>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                      <Text weight="medium">{user.name}</Text>
                    </td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                      <Text color="secondary">{user.email}</Text>
                    </td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                      <Text 
                        size="sm" 
                        weight="medium"
                        style={{
                          backgroundColor: user.status === 'Active' ? '#dcfce7' : '#fef3c7',
                          color: user.status === 'Active' ? '#166534' : '#92400e',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.375rem',
                          display: 'inline-block'
                        }}
                      >
                        {user.status}
                      </Text>
                    </td>
                    <td style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6' }}>
                      <Box display="flex" style={{ gap: '0.5rem' }}>
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="ghost">Delete</Button>
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

// Main application component
function ConsumingApp() {
  return (
    <ThemeProvider 
      theme={appTheme} 
      enableCSSVariables 
      cssVariablePrefix="--app"
    >
      <Dashboard />
    </ThemeProvider>
  );
}

export default ConsumingApp;
