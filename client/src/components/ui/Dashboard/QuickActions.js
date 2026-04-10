import React from 'react';
import { Plus, Upload, FileText, Users, Bell, Settings, ChevronRight } from 'lucide-react';

const QuickActions = ({ actions = [], loading = false }) => {
  const defaultActions = [
    {
      id: 1,
      label: 'Add Student',
      icon: Plus,
      color: 'from-primary-500 to-primary-600',
      onClick: () => console.log('Add student'),
    },
    {
      id: 2,
      label: 'Upload Marks',
      icon: Upload,
      color: 'from-accent-teal to-accent-teal/80',
      onClick: () => console.log('Upload marks'),
    },
    {
      id: 3,
      label: 'Mark Attendance',
      icon: Users,
      color: 'from-emerald-500 to-emerald-600',
      onClick: () => console.log('Mark attendance'),
    },
    {
      id: 4,
      label: 'Create Notice',
      icon: Bell,
      color: 'from-amber-500 to-amber-600',
      onClick: () => console.log('Create notice'),
    },
    {
      id: 5,
      label: 'Generate Report',
      icon: FileText,
      color: 'from-accent-purple to-accent-purple/80',
      onClick: () => console.log('Generate report'),
    },
    {
      id: 6,
      label: 'Settings',
      icon: Settings,
      color: 'from-dark-600 to-dark-500',
      onClick: () => console.log('Settings'),
    },
  ];

  const displayActions = actions.length > 0 ? actions : defaultActions;

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-24 bg-light-300 dark:bg-dark-700 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {displayActions.map((action) => {
        const Icon = action.icon;

        return (
          <button
            key={action.id}
            onClick={action.onClick}
            className="group relative overflow-hidden bg-white dark:bg-dark-800 rounded-xl p-4 border border-light-600 dark:border-dark-600 hover:border-primary-500/50 transition-all duration-200 hover:shadow-light-md dark:hover:shadow-dark"
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-200`} />

            <div className="relative flex flex-col items-center text-center gap-2">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-light-sm dark:shadow-dark-sm group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-content dark:text-content-dark group-hover:text-primary-400 transition-colors">
                {action.label}
              </span>
              <ChevronRight className="w-4 h-4 text-content-muted dark:text-content-dark-muted opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;
