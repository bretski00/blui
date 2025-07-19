import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, Navbar } from './index';
import { FrameworkDemoPage, ConsumingAppPage, ThemePlaygroundPage, LayoutDemoPage, ComponentPlaygroundPage } from './pages';

function App() {
  return (
    <Router>
      <ThemeProvider enableCSSVariables>
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<FrameworkDemoPage />} />
              <Route path="/playground" element={<ThemePlaygroundPage />} />
              <Route path="/components" element={<ComponentPlaygroundPage />} />
              <Route path="/layouts" element={<LayoutDemoPage />} />
              <Route path="/consuming-app" element={<ConsumingAppPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
