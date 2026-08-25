import './globals.css';

export const metadata = {
  title: 'Weather Excuse',
  description: 'Generate calm, credible meeting excuses based on real weather and local usage history.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f8fafc',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}