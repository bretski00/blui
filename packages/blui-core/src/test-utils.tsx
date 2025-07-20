import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from './theme';
import { defaultCoreTheme } from './theme/defaultTheme';

// Custom render function that includes ThemeProvider
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={defaultCoreTheme}>
      {children}
    </ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything
export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { customRender as render };
