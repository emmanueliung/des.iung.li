import type { Metadata } from 'next';
import { LanguageProvider } from '@/context/language-context';
import GoogleAnalytics from '@/components/google-analytics';
import './globals.css';

export const metadata: Metadata = {
  title: 'Emmanuel Iung | Portfolio',
  description: "Designer graphique, Développeur Web et passionné d'IA avec plus de 20 ans d'expérience. Création d'expériences visuelles avec les nouvelles technologies.",
  keywords: ['graphic design', 'web development', 'ai applications', 'portfolio', 'freelance designer', 'uidesign', 'uxdesign'],
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="!scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;700;900&display=swap" rel="stylesheet" />
        <GoogleAnalytics />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
