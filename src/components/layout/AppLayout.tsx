import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { TopBar } from '@/components/layout/TopBar';
import { useAuth } from '@/contexts/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 p-6 bg-gradient-to-br from-background via-background to-electric-blue/5">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};