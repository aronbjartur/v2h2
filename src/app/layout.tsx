import './globals.css';
import { AuthProvider } from './context/AuthContext'; 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="is">
      <body>
        <AuthProvider> 
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}