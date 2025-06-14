'use client';
import { ReactNode, useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar/AppSidebar';
import { Header } from '@/components/Header/Header';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentpPath] = useState(['']);

  return (
    <html lang="en">
      <body>
        <div className="h-screen w-full flex row-auto">
          <AppSidebar setCurrentpPath={setCurrentpPath} />
          <main className="h-screen w-full ">
            <Header currentPath={currentPath} />
            <div className="bg-[#f5f5f5] h-[calc(100%-80px)] pl-10 pt-9 pr-9 flex flex-col gap-y-3 w-full max-w-[calc(100vw-260px)]">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
