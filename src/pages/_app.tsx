import { AppSidebar } from '@/components/AppSidebar/AppSidebar';
import { Header } from '@/components/Header/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen w-full flex row-auto">
      <AppSidebar />
      <main className="h-screen w-full bg-amber-200">
        <Header />
        <div className="bg-[#f5f5f5] h-[calc(100%-80px)] pl-10 pt-9 pr-9 flex flex-col gap-y-3">
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  );
}
