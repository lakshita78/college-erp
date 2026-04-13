import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, userRole = 'admin', user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const defaultUser = {
    name: 'Administrator',
    role: 'System Admin',
    email: 'admin@erp.edu',
    avatar: null,
  };

  const savedUser = JSON.parse(localStorage.getItem("user")) || JSON.parse(localStorage.getItem("adminUser"));
  const currentUser = user || (savedUser?.result ? {
    name: savedUser.result.name,
    role: savedUser.result.designation || 'Administrator',
    email: savedUser.result.email,
    avatar: savedUser.result.avatar
  } : defaultUser);

  return (
    <div className="min-h-screen bg-transparent dark:bg-dark-900">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar userRole={userRole} />
      </div>

      {/* Sidebar - Mobile Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-light-900/80 dark:bg-dark-900/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full z-50 lg:hidden">
            <Sidebar userRole={userRole} />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          user={currentUser}
        />

        {/* Page Content */}
        <main className="flex-1 pt-16 px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
