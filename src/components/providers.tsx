'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'toast-custom',
          duration: 4000,
        }}
      />
    </ThemeProvider>
  );
}
