import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import "./i18next"
import  I18nextProvider  from './i18next/I18nProvider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     <head>
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <I18nextProvider>
        <Nav />
        {children}
        <Footer />
        </I18nextProvider>
      </body>
    </html>
  );
}
