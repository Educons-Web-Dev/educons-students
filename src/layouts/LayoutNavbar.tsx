import React from 'react';
import { Navbar } from '../components';

interface ILayoutNavbarProps {
  children: React.ReactNode;
}

export const LayoutNavbar = ({ children }: ILayoutNavbarProps) => {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      {children}
    </main>
  );
};
