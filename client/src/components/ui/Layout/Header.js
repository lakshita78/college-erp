import React, { useState } from 'react';
import {
  Search,
  Bell,
  User,
  ChevronDown,
  Moon,
  Sun,
  Settings,
  HelpCircle,
  Menu
} from 'lucide-react';

const Header = ({ onMenuClick, user = { name: 'John Doe', role: 'Administrator', avatar: null } }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(true);

  const notifications = [
    { id: 1, title: 'New student registration', message: '5 new students registered today', time: '2 min ago', type: 'info' },
    { id: 2, title: 'System update', message: 'Scheduled maintenance at 2:00 AM', time: '1 hour ago', type: 'warning' },
    { id: 3, title: 'Grade submission', message: 'Final grades due tomorrow', time: '3 hours ago', type: 'urgent' },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info':
        return 'bg-primary-500/20 text-primary-400';
      case 'warning':
        return 'bg-amber-500/20 text-amber-400';
      case 'urgent':
        return 'bg-rose-500/20 text-rose-400';
      default:
        return 'bg-dark-600 text-content-muted';
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl border-b border-light-600 dark:border-dark-600 z-30 transition-all duration-300">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section - Mobile Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-light-700 dark:hover:bg-dark-700 text-content-muted dark:text-content-dark-muted"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted dark:text-content-dark-muted" />
            <input
              type="text"
              placeholder="Search students, faculty, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-light-700 dark:bg-dark-700 border border-light-600 dark:border-dark-600 rounded-xl text-sm text-content dark:text-content-dark placeholder-content-muted dark:placeholder-content-dark-muted focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-light-700 dark:hover:bg-dark-700 text-content-muted dark:text-content-dark-muted hover:text-content dark:hover:text-content-dark transition-all duration-200"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl hover:bg-dark-700 text-content-muted hover:text-content transition-all duration-200"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-dark-800 border border-light-600 dark:border-dark-600 rounded-2xl shadow-light-lg dark:shadow-dark-lg z-50 animate-fade-in">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-light-600 dark:border-dark-600">
                    <h3 className="font-semibold text-content dark:text-content-dark">Notifications</h3>
                    <span className="text-xs text-primary-400 cursor-pointer hover:underline">
                      Mark all read
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto scrollbar-thin">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-light-100 dark:hover:bg-dark-700 transition-colors cursor-pointer border-b border-light-600/50 dark:border-dark-600/50 last:border-0"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${getNotificationIcon(notification.type)}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-content truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-content-muted mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-xs text-content-disabled mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-dark-600">
                    <button className="w-full text-center text-sm text-primary-400 hover:text-primary-300 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-xl hover:bg-dark-700 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white font-medium">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-content">{user.name}</p>
                <p className="text-xs text-content-muted">{user.role}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-content-muted transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfile && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfile(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-dark-800 border border-dark-600 rounded-2xl shadow-dark-lg z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-dark-600">
                    <p className="text-sm font-medium text-content">{user.name}</p>
                    <p className="text-xs text-content-muted">{user.email || 'user@example.com'}</p>
                  </div>
                  <ul className="py-2">
                    <li>
                      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-content-muted hover:bg-dark-700 hover:text-content transition-colors">
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-content-muted hover:bg-dark-700 hover:text-content transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </li>
                    <li>
                      <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-content-muted hover:bg-dark-700 hover:text-content transition-colors">
                        <HelpCircle className="w-4 h-4" />
                        Help & Support
                      </button>
                    </li>
                  </ul>
                  <div className="px-4 py-2 border-t border-dark-600">
                    <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                      <span className="w-4 h-4">→</span>
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
