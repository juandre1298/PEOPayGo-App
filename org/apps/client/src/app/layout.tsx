import '../assets/global.css';
import Navbar from '../components/Navbar';

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
        <Navbar />
        <main className="relative overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
