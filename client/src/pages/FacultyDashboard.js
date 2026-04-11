import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserCog,
  BookOpen,
  Users,
  ClipboardList,
  FileText,
  Calendar,
  TrendingUp,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle2,
  MoreHorizontal,
} from 'lucide-react';
import {
  Layout,
  StatCard,
  Card,
  Button,
  Badge,
  DataTable,
  ActivityFeed,
} from '../components/ui';
import {
  getTest,
  getStudent,
} from '../redux/actions/facultyActions';

const FacultyDashboard = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const faculty = store.faculty?.facultyData;

  useEffect(() => {
    if (faculty?._id) {
      dispatch(getTest(faculty._id));
    }
  }, [dispatch, faculty?._id]);

  // Stats for faculty
  const stats = [
    {
      title: 'My Courses',
      value: '4',
      change: 0,
      changeType: 'neutral',
      icon: BookOpen,
      onClick: () => {}, // To be linked to a courses page
    },
    {
      title: 'Total Students',
      value: store.faculty?.allStudent?.length || '186',
      change: 12,
      changeType: 'positive',
      icon: Users,
      onClick: () => window.location.href = '/admin/allstudent',
    },
    {
      title: 'Tests Created',
      value: store.faculty?.tests?.length || '8',
      change: 2,
      changeType: 'positive',
      icon: FileText,
      onClick: () => window.location.href = '/faculty/uploadmarks',
    },
    {
      title: 'Pending Reviews',
      value: '24',
      change: -5,
      changeType: 'negative',
      icon: ClipboardList,
      onClick: () => {},
    },
  ];

  // Quick actions for faculty
  const quickActions = [
    {
      id: 1,
      label: 'Create Test',
      icon: Plus,
      color: 'from-primary-500 to-primary-600',
      onClick: () => window.location.href = '/faculty/createtest',
    },
    {
      id: 2,
      label: 'Upload Marks',
      icon: FileText,
      color: 'from-accent-teal to-accent-teal/80',
      onClick: () => window.location.href = '/faculty/uploadmarks',
    },
    {
      id: 3,
      label: 'Mark Attendance',
      icon: CheckCircle2,
      color: 'from-emerald-500 to-emerald-600',
      onClick: () => window.location.href = '/faculty/markattendance',
    },
    {
      id: 4,
      label: 'View Students',
      icon: Users,
      color: 'from-accent-purple to-accent-purple/80',
      onClick: () => window.location.href = '/admin/allstudent',
    },
  ];

  // Today's schedule
  const schedule = [
    { time: '09:00 AM', subject: 'Data Structures Lab', room: 'Lab 101', batch: 'CSE-3A', students: 60 },
    { time: '11:00 AM', subject: 'Algorithms Theory', room: 'Room 302', batch: 'CSE-2B', students: 58 },
    { time: '02:00 PM', subject: 'DBMS Lab', room: 'Lab 105', batch: 'CSE-3B', students: 62 },
    { time: '04:00 PM', subject: 'Tutorial Session', room: 'Room 205', batch: 'CSE-4A', students: 55 },
  ];

  // Pending tasks
  const pendingTasks = [
    { title: 'Grade CS301 Mid-term Papers', deadline: 'Today, 5:00 PM', priority: 'high', count: 45 },
    { title: 'Prepare Assignment 3 Questions', deadline: 'Tomorrow', priority: 'medium', count: 1 },
    { title: 'Review Project Proposals', deadline: 'In 2 days', priority: 'medium', count: 12 },
  ];

  // Real data: Recent tests instead of dummy submissions
  const testColumns = [
    {
      key: 'testName',
      header: 'Test Name',
      render: (value, row) => (
        <div>
          <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-tight">{value}</p>
          <p className="text-xs text-primary-500 font-medium">{row.subject}</p>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: (value) => <Badge variant="secondary" size="sm" className="font-bold">{value}</Badge>,
    },
    {
      key: 'year',
      header: 'Batch/Year',
      render: (value, row) => <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Year {value} • {row.section}</span>,
    },
    {
      key: 'date',
      header: 'Date',
      render: (value) => <span className="text-sm text-gray-600 dark:text-gray-400">{new Date(value).toLocaleDateString()}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: () => (
        <Badge variant="success" size="sm" className="px-3">Published</Badge>
      ),
    },
  ];

  const handleRowAction = (row, action) => {
    if (action === 'view') {
      alert(`Viewing details for ${row.testName}`);
    } else if (action === 'edit') {
      alert(`Opening editor for ${row.testName}`);
    } else if (action === 'delete') {
      alert(`Are you sure you want to delete ${row.testName}?`);
    }
  };

  const testsData = store.faculty?.tests || [];

  return (
    <Layout
      userRole="faculty"
      user={{
        name: faculty?.name || 'Faculty',
        role: faculty?.designation || 'Professor',
      }}
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome, {faculty?.name?.split(' ')[0] || 'Professor'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your courses and track student progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`group p-4 rounded-xl bg-gradient-to-br ${action.color} text-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
          >
            <action.icon className="w-6 h-6 mb-3" />
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card
            title="Today's Schedule"
            subtitle="Your classes for today"
            action={
              <Button variant="ghost" size="sm" leftIcon={Calendar}>
                Full Schedule
              </Button>
            }
          >
            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 p-5 rounded-xl bg-primary-50 dark:bg-dark-700/50 hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors text-center sm:text-left"
                >
                  <div className="flex flex-col items-center min-w-[100px] border-b sm:border-b-0 sm:border-r border-primary-200 dark:border-dark-600 pb-3 sm:pb-0 sm:pr-4">
                    <Clock className="w-5 h-5 text-primary-500 mb-1" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{item.time}</span>
                  </div>
                  <div className="flex-1 text-center">
                    <h4 className="font-bold text-lg text-primary-900 dark:text-white mb-1 uppercase tracking-tight">{item.subject}</h4>
                    <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Badge variant="secondary" size="sm">{item.room}</Badge>
                      <span className="text-primary-300">•</span>
                      <Badge variant="secondary" size="sm" className="bg-white/50">{item.batch}</Badge>
                      <span className="text-primary-300">•</span>
                      <span className="font-medium">{item.students} Students</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="hover:bg-white/50">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Pending Tasks */}
        <div>
          <Card title="Pending Tasks" subtitle="Items requiring attention">
            <div className="space-y-4">
              {pendingTasks.map((task, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-primary-50 dark:bg-dark-700/50 hover:bg-primary-100 dark:hover:bg-dark-700 transition-colors cursor-pointer border-l-4 border-l-primary-500 shadow-sm"
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className={`p-2 rounded-full ${
                      task.priority === 'high' ? 'bg-rose-100 text-rose-500' : 'bg-amber-100 text-amber-500'
                    }`}>
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-primary-900 dark:text-white mb-2 uppercase tracking-tight">
                        {task.title}
                      </h4>
                      <div className="flex flex-col items-center gap-2">
                        <Badge
                          variant={task.priority === 'high' ? 'danger' : 'warning'}
                          size="sm"
                          className="px-4 py-1"
                        >
                          {task.count} items remaining
                        </Badge>
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1 uppercase tracking-wide">
                          <Clock className="w-3 h-3" /> Due: {task.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card
        title="Recent Academic Activity"
        subtitle="Your recently published tests and academic updates"
        action={
          <Button variant="primary" size="sm" onClick={() => window.location.href = '/faculty/uploadmarks'}>
            Manage All
          </Button>
        }
      >
        <DataTable
          columns={testColumns}
          data={testsData}
          pagination={false}
          searchable={false}
          onRowClick={handleRowAction}
          emptyState={
            <div className="py-12 text-center">
              <div className="bg-primary-50 dark:bg-dark-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">No academic activity yet</h3>
              <p className="text-gray-500 max-w-xs mx-auto mt-1">Start by creating your first test or marking attendance to see updates here.</p>
              <Button 
                variant="primary" 
                size="sm" 
                className="mt-6"
                onClick={() => window.location.href = '/faculty/createtest'}
                leftIcon={Plus}
              >
                Create First Test
              </Button>
            </div>
          }
        />
      </Card>
    </Layout>
  );
};

export default FacultyDashboard;
