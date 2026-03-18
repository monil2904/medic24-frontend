import { AuthProvider } from '@/context/AuthContext';
import type { Metadata } from 'next';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: 'Medic24 AI - Your Personal Medical Assistant',
  description: 'AI-powered chatbot for medical queries, lab report analysis, and clinical insights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${bricolage.variable}`}>
        <AuthProvider>
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
