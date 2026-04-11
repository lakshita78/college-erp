import React from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  Layout,
  StatCard,
  Card,
  CardGrid,
  ActivityFeed,
  QuickActions,
  Button,
  Badge,
} from '../components/ui';

const DashboardPage = () => {
  // Sample stats data
  const stats = [
    {
      title: 'Total Students',
      value: '2,547',
      change: 12.5,
      changeType: 'positive',
      icon: GraduationCap,
    },
    {
      title: 'Total Faculty',
      value: '186',
      change: 8.2,
      changeType: 'positive',
      icon: Users,
    },
    {
      title: 'Active Courses',
      value: '84',
      change: -2.1,
      changeType: 'negative',
      icon: BookOpen,
    },
    {
      title: 'Revenue',
      value: '$1.2M',
      change: 15.3,
      changeType: 'positive',
      icon: DollarSign,
      prefix: '$',
    },
  ];

  // Sample upcoming events
  const events = [
    {
      id: 1,
      title: 'Final Examinations Begin',
      date: '2024-01-15',
      time: '09:00 AM',
      type: 'exam',
      location: 'Main Campus',
    },
    {
      id: 2,
      title: 'Faculty Meeting',
      date: '2024-01-12',
      time: '02:00 PM',
      type: 'meeting',
      location: 'Conference Room A',
    },
    {
      id: 3,
      title: 'Admission Open - Spring 2024',
      date: '2024-01-20',
      time: 'All Day',
      type: 'admission',
      location: 'Online',
    },
    {
      id: 4,
      title: 'Department Workshop',
      date: '2024-01-18',
      time: '10:00 AM',
      type: 'workshop',
      location: 'CS Lab',
    },
  ];

  // Sample department performance
  const departmentStats = [
    { name: 'Computer Science', students: 650, performance: 92 },
    { name: 'Electronics', students: 420, performance: 88 },
    { name: 'Mechanical', students: 380, performance: 85 },
    { name: 'Civil', students: 310, performance: 82 },
    { name: 'Business', students: 520, performance: 90 },
  ];

  return (
    <Layout userRole="admin">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening at your institution today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActions />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card title="Recent Activity" subtitle="Latest updates from your institution">
            <ActivityFeed />
          </Card>
        </div>

        {/* Upcoming Events - Takes 1 column */}
        <div>
          <Card
            title="Upcoming Events"
            subtitle="Next 7 days"
            action={
              <Button variant="ghost" size="sm">
                View Calendar
              </Button>
            }
          >
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-dark-700/50 transition-colors cursor-pointer group"
                >
                  {/* Date Box */}
                  <div className="flex-shrink-0 w-14 h-14 bg-light-200 dark:bg-dark-700 rounded-xl flex flex-col items-center justify-center border border-light-600 dark:border-dark-600">
                    <span className="text-xs text-gray-600 dark:text-gray-400 uppercase">
                      {new Date(event.date).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-400 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {event.time} • {event.location}
                    </p>
                    <div className="mt-2">
                      <Badge
                        variant={
                          event.type === 'exam'
                            ? 'danger'
                            : event.type === 'admission'
                            ? 'success'
                            : 'primary'
                        }
                        size="sm"
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Department Performance */}
      <Card title="Department Performance" subtitle="Student distribution and performance metrics">
        <div className="space-y-4">
          {departmentStats.map((dept) => (
            <div key={dept.name} className="flex items-center gap-4">
              <div className="w-40 flex-shrink-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{dept.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{dept.students} students</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-light-600 dark:bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-purple transition-all duration-500"
                      style={{ width: `${dept.performance}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-10">
                    {dept.performance}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Layout>
  );
};

export default DashboardPage;
