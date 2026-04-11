import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Building2,
  GraduationCap,
  BookOpen,
  UserCog
} from 'lucide-react';

const Sidebar = ({ userRole = 'admin' }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Define menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/users', icon: Users, label: 'Users' },
      { path: '/orders', icon: ShoppingCart, label: 'Orders' },
      { path: '/products', icon: Package, label: 'Products' },
      { path: '/reports', icon: FileText, label: 'Reports' },
    ];

    const adminItems = [
      { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/admin/students', icon: GraduationCap, label: 'Students' },
      { path: '/admin/faculty', icon: UserCog, label: 'Faculty' },
      { path: '/admin/departments', icon: Building2, label: 'Departments' },
      { path: '/admin/subjects', icon: BookOpen, label: 'Subjects' },
      { path: '/admin/notices', icon: Bell, label: 'Notices' },
    ];

    const facultyItems = [
      { path: '/faculty/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/faculty/marks', icon: FileText, label: 'Upload Marks' },
      { path: '/faculty/attendance', icon: Users, label: 'Attendance' },
      { path: '/faculty/tests', icon: BookOpen, label: 'Tests' },
    ];

    const studentItems = [
      { path: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/student/subjects', icon: BookOpen, label: 'My Subjects' },
      { path: '/student/attendance', icon: Users, label: 'Attendance' },
      { path: '/student/results', icon: FileText, label: 'Results' },
    ];

    switch (userRole) {
      case 'admin':
        return adminItems;
      case 'faculty':
        return facultyItems;
      case 'student':
        return studentItems;
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-dark-900 border-r border-light-600 dark:border-dark-600 transition-all duration-300 z-40 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-light-600 dark:border-dark-600">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">ERP Portal</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center mx-auto">
            <Building2 className="w-5 h-5 text-white" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-dark-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-light-500 dark:scrollbar-thumb-dark-500 scrollbar-track-light-700 dark:scrollbar-track-dark-700">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-primary-100/50 dark:hover:bg-dark-700 hover:text-gray-900 dark:hover:text-white border border-transparent'
                    }`
                  }
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-primary-400' : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white'
                    }`}
                  />
                  {!collapsed && (
                    <span className="font-medium text-sm text-gray-900 dark:text-white">{item.label}</span>
                  )}
                  {isActive && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-light-600 dark:border-dark-600">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all duration-200 w-full ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-medium text-sm text-gray-900 dark:text-white">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
