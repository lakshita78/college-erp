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
    },
    {
      title: 'Total Students',
      value: '186',
      change: 12,
      changeType: 'positive',
      icon: Users,
    },
    {
      title: 'Tests Created',
      value: store.faculty?.tests?.length || '8',
      change: 2,
      changeType: 'positive',
      icon: FileText,
    },
    {
      title: 'Pending Reviews',
      value: '24',
      change: -5,
      changeType: 'negative',
      icon: ClipboardList,
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

  // Recent student submissions
  const submissionsColumns = [
    {
      key: 'student',
      header: 'Student',
      render: (value) => (
        <div>
          <p className="text-sm font-medium text-content">{value.name}</p>
          <p className="text-xs text-content-muted">{value.id}</p>
        </div>
      ),
    },
    {
      key: 'subject',
      header: 'Subject',
      render: (value) => <span className="text-sm text-content">{value}</span>,
    },
    {
      key: 'assignment',
      header: 'Assignment',
      render: (value) => <span className="text-sm text-content">{value}</span>,
    },
    {
      key: 'submitted',
      header: 'Submitted',
      render: (value) => <span className="text-sm text-content-muted">{value}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge
          variant={value === 'Graded' ? 'success' : value === 'Late' ? 'danger' : 'warning'}
          size="sm"
        >
          {value}
        </Badge>
      ),
    },
  ];

  const submissionsData = [
    { student: { name: 'John Smith', id: 'STU2021001' }, subject: 'Data Structures', assignment: 'Assignment 2', submitted: '2 hours ago', status: 'Pending' },
    { student: { name: 'Emily Davis', id: 'STU2021034' }, subject: 'Algorithms', assignment: 'Lab 4', submitted: '3 hours ago', status: 'Graded' },
    { student: { name: 'Michael Brown', id: 'STU2021056' }, subject: 'DBMS', assignment: 'Project Phase 1', submitted: '5 hours ago', status: 'Late' },
    { student: { name: 'Sarah Wilson', id: 'STU2021089' }, subject: 'Data Structures', assignment: 'Assignment 2', submitted: 'Yesterday', status: 'Pending' },
  ];

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
        <h1 className="text-2xl font-bold text-content mb-2">
          Welcome, {faculty?.name?.split(' ')[0] || 'Professor'}!
        </h1>
        <p className="text-content-muted">
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
                  className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors"
                >
                  <div className="flex flex-col items-center min-w-[80px]">
                    <Clock className="w-4 h-4 text-primary-400 mb-1" />
                    <span className="text-sm font-medium text-content">{item.time}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-content">{item.subject}</h4>
                    <p className="text-sm text-content-muted">
                      {item.room} • {item.batch} • {item.students} students
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
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
                  className="p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors cursor-pointer border-l-4 border-l-primary-500"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 ${
                      task.priority === 'high' ? 'text-rose-400' : 'text-amber-400'
                    }`} />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-content mb-1">
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={task.priority === 'high' ? 'danger' : 'warning'}
                          size="sm"
                        >
                          {task.count} items
                        </Badge>
                        <span className="text-xs text-content-muted">{task.deadline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Submissions */}
      <Card
        title="Recent Submissions"
        subtitle="Student assignment submissions"
        action={
          <Button variant="primary" size="sm">
            View All
          </Button>
        }
      >
        <DataTable
          columns={submissionsColumns}
          data={submissionsData}
          pagination={false}
          searchable={false}
        />
      </Card>
    </Layout>
  );
};

export default FacultyDashboard;
