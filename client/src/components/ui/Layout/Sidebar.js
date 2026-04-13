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
  const [expandedGroups, setExpandedGroups] = useState(['Academic Management', 'Student Management', 'Faculty Management']);
  const location = useLocation();

  const toggleGroup = (groupLabel) => {
    setExpandedGroups(prev =>
      prev.includes(groupLabel)
        ? prev.filter(g => g !== groupLabel)
        : [...prev, groupLabel]
    );
  };

  // Define menu items based on user role
  const getMenuGroups = () => {
    const adminGroups = [
      {
        label: 'Main',
        items: [
          { path: '/admin/home', icon: LayoutDashboard, label: 'Dashboard' },
          { path: '/admin/profile', icon: UserCog, label: 'My Profile' },
          { path: '/admin/createnotice', icon: Bell, label: 'Notices' },
        ]
      },
      {
        label: 'Academic Management',
        icon: GraduationCap,
        items: [
          {
            label: 'Faculty',
            icon: Users,
            children: [
              { path: '/admin/allfaculty', label: 'Our Faculty' },
              { path: '/admin/addfaculty', label: 'Add Faculty' },
              { path: '/admin/deletefaculty', label: 'Delete Faculty' },
            ]
          },
          {
            label: 'Students',
            icon: Users,
            children: [
              { path: '/admin/allstudent', label: 'Our Students' },
              { path: '/admin/addstudent', label: 'Add Student' },
              { path: '/admin/deletestudent', label: 'Delete Student' },
            ]
          },
          {
            label: 'Subjects',
            icon: BookOpen,
            children: [
              { path: '/admin/allsubject', label: 'All Subjects' },
              { path: '/admin/addsubject', label: 'Add Subject' },
              { path: '/admin/deletesubject', label: 'Delete Subject' },
            ]
          }
        ]
      },
      {
        label: 'Institution',
        icon: Building2,
        items: [
          {
            label: 'Departments',
            icon: Building2,
            children: [
              { path: '/admin/adddepartment', label: 'Add Department' },
              { path: '/admin/deletedepartment', label: 'Delete Department' },
            ]
          },
          {
            label: 'Administrators',
            icon: UserCog,
            children: [
              { path: '/admin/addadmin', label: 'Add Admin' },
              { path: '/admin/deleteadmin', label: 'Delete Admin' },
            ]
          }
        ]
      }
    ];

    const facultyGroups = [
      {
        label: 'Main',
        items: [
          { path: '/faculty/home', icon: LayoutDashboard, label: 'Dashboard' },
          { path: '/faculty/profile', icon: UserCog, label: 'My Profile' },
        ]
      },
      {
        label: 'Academic',
        icon: GraduationCap,
        items: [
          { path: '/faculty/createtest', icon: BookOpen, label: 'Create Test' },
          { path: '/faculty/uploadmarks', icon: FileText, label: 'Upload Marks' },
          { path: '/faculty/markattendance', icon: Users, label: 'Mark Attendance' },
        ]
      }
    ];

    const studentGroups = [
      {
        label: 'Main',
        items: [
          { path: '/student/home', icon: LayoutDashboard, label: 'Dashboard' },
          { path: '/student/profile', icon: UserCog, label: 'My Profile' },
        ]
      },
      {
        label: 'Academic',
        icon: GraduationCap,
        items: [
          { path: '/student/subjectlist', icon: BookOpen, label: 'My Subjects' },
          { path: '/student/attendance', icon: Users, label: 'My Attendance' },
          { path: '/student/testresult', icon: FileText, label: 'Test Results' },
        ]
      }
    ];

    switch (userRole) {
      case 'admin': return adminGroups;
      case 'faculty': return facultyGroups;
      case 'student': return studentGroups;
      default: return [];
    }
  };

  const menuGroups = getMenuGroups();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 z-40 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-50">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">INFIX ERP</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center mx-auto">
            <Building2 className="w-5 h-5 text-white" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-4 overflow-y-auto scrollbar-none pb-24">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-6 last:mb-0">
            {!collapsed && (
              <h3 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                {group.label}
              </h3>
            )}
            <ul className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const isGroupHeader = !!item.children;
                const isExpanded = expandedGroups.includes(item.label);
                
                if (isGroupHeader) {
                  return (
                    <li key={itemIdx}>
                      <button
                        onClick={() => toggleGroup(item.label)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                          isExpanded ? 'bg-gray-50/50 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isExpanded ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        {!collapsed && (
                          <>
                            <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                            <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90 text-primary-600' : 'text-gray-300'}`} />
                          </>
                        )}
                      </button>
                      
                      {isExpanded && !collapsed && (
                        <ul className="mt-1 ml-6 pl-4 border-l border-gray-100 space-y-1 animate-in fade-in slide-in-from-left-2 duration-300">
                          {item.children.map((child, childIdx) => (
                            <li key={childIdx}>
                              <NavLink
                                to={child.path}
                                className={({ isActive }) =>
                                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                    isActive
                                      ? 'text-primary-600 font-semibold bg-primary-50/50'
                                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                  }`
                                }
                              >
                                {child.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={itemIdx}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? 'bg-primary-50 text-primary-600 shadow-sm shadow-primary-100/20'
                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          location.pathname === item.path ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
                        }`}
                      />
                      {!collapsed && (
                        <span className="font-medium text-sm">{item.label}</span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-50">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all duration-200 w-full ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5 font-bold" />
          {!collapsed && <span className="font-bold text-xs uppercase tracking-widest mt-0.5">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
