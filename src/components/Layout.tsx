
import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="crm-layout">
      <Nav />
      <main className="container py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
