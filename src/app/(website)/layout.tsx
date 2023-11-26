import ThemeProvider from '@/components/Global/ThemeProvider';
import Navbar from '@/components/Navbar/Navbar';
import '@/styles/global.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}