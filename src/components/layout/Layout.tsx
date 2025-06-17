import React from 'react';
import Header from './Header';
import BottomNavbar from './BottomNavbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16 pb-16">
        {children}
      </main>
      <BottomNavbar />
    </div>
  );
} 