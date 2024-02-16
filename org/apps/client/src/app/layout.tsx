import '../assets/global.css';
import Navbar from '../components/Navbar';
import { GlobalContextProvider } from '../context/store';

export const metadata = {
  title: 'Welcome to client',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="abolsute">
        <GlobalContextProvider>
          <Navbar />
          <main className="relative overflow-hidden">{children}</main>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
