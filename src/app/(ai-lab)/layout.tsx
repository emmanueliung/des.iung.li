import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

export default function AILabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen theme-ai-lab bg-[#00007a] text-white">
      <Header isAILabProp={true} />
      <main className="flex-1">
        {children}
      </main>
      <Toaster />
      <Footer />
    </div>
  );
}
