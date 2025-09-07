import './globals.css';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import { ThemeToggle } from '../components/ThemeToggle';

export const metadata = {
  title: 'Business CRM',
  description: 'CRM system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="light">
          <nav className="flex gap-4 p-4">
            <Link href="/">Home</Link>
            <Link href="/pipeline">Pipeline</Link>
            <Link href="/meetings">Meetings</Link>
            <ThemeToggle />
          </nav>
          <main className="p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
