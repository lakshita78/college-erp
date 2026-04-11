import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Users,
  GraduationCap,
  UserCog,
  Building2,
  BookOpen,
  Bell,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  MoreHorizontal,
} from 'lucide-react';
import {
  Layout,
  StatCard,
  Card,
  Button,
  DataTable,
  Badge,
  QuickActions,
  ActivityFeed,
} from '../components/ui';
import {
  getAllStudent,
  getAllFaculty,
  getAllAdmin,
  getAllDepartment,
  getNotice,
} from '../redux/actions/adminActions';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllStudent());
    dispatch(getAllFaculty());
    dispatch(getAllAdmin());
    dispatch(getAllDepartment());
    dispatch(getNotice());
  }, [dispatch]);

  // Sample data for dashboard
  const stats = [
    {
      title: 'Total Students',
      value: store.admin?.allStudent?.length || '2,547',
      change: 12.5,
      changeType: 'positive',
      icon: GraduationCap,
    },
    {
      title: 'Total Faculty',
      value: store.admin?.allFaculty?.length || '186',
      change: 8.2,
      changeType: 'positive',
      icon: UserCog,
    },
    {
      title: 'Departments',
      value: store.admin?.allDepartment?.length || '12',
      change: 0,
      changeType: 'neutral',
      icon: Building2,
    },
    {
      title: 'Courses',
      value: '84',
      change: 5.3,
      changeType: 'positive',
      icon: BookOpen,
    },
  ];

  // Quick actions for admin
  const quickActions = [
    {
      id: 1,
      label: 'Add Student',
      icon: Plus,
      color: 'from-primary-500 to-primary-600',
      onClick: () => window.location.href = '/admin/addstudent',
    },
    {
      id: 2,
      label: 'Add Faculty',
      icon: Plus,
      color: 'from-accent-teal to-accent-teal/80',
      onClick: () => window.location.href = '/admin/addfaculty',
    },
    {
      id: 3,
      label: 'Add Department',
      icon: Plus,
      color: 'from-emerald-500 to-emerald-600',
      onClick: () => window.location.href = '/admin/adddepartment',
    },
    {
      id: 4,
      label: 'Create Notice',
      icon: Bell,
      color: 'from-amber-500 to-amber-600',
      onClick: () => window.location.href = '/admin/createnotice',
    },
    {
      id: 5,
      label: 'Add Subject',
      icon: BookOpen,
      color: 'from-accent-purple to-accent-purple/80',
      onClick: () => window.location.href = '/admin/addsubject',
    },
    {
      id: 6,
      label: 'View Reports',
      icon: TrendingUp,
      color: 'from-rose-500 to-rose-600',
      onClick: () => window.location.href = '/newui/reports',
    },
  ];

  // Recent students table columns
  const studentColumns = [
    {
      key: 'name',
      header: 'Student Name',
      render: (value, row) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: (value) => <Badge variant="secondary">{value}</Badge>,
    },
    {
      key: 'year',
      header: 'Year',
      render: (value) => <span className="text-sm text-gray-900 dark:text-white">{value}</span>,
    },
    {
      key: 'batch',
      header: 'Batch',
      render: (value) => <span className="text-sm text-gray-900 dark:text-white">{value}</span>,
    },
    {
      key: 'actions',
      header: '',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-400 hover:text-primary-400 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-400 hover:text-rose-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Sample students data
  const studentsData = store.admin?.allStudent?.slice(0, 5) || [
    { id: 1, name: 'John Smith', email: 'john@erp.edu', department: 'Computer Science', year: '3rd', batch: '2022' },
    { id: 2, name: 'Emily Davis', email: 'emily@erp.edu', department: 'Electronics', year: '2nd', batch: '2023' },
    { id: 3, name: 'Michael Brown', email: 'michael@erp.edu', department: 'Mechanical', year: '4th', batch: '2021' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@erp.edu', department: 'Civil', year: '3rd', batch: '2022' },
    { id: 5, name: 'David Lee', email: 'david@erp.edu', department: 'Business', year: '2nd', batch: '2023' },
  ];

  // Sample departments data
  const departmentsData = [
    { name: 'Computer Science', students: 245, change: '+12', trend: 'up' },
    { name: 'Electronics', students: 189, change: '+8', trend: 'up' },
    { name: 'Mechanical', students: 167, change: '-3', trend: 'down' },
    { name: 'Civil', students: 134, change: '+5', trend: 'up' },
  ];

  return (
    <Layout userRole="admin" user={{ name: 'Administrator', role: 'System Admin' }}>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Manage your institution from one central hub.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActions actions={quickActions} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Students - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card
            title="Recent Students"
            subtitle="Recently added students"
            action={
              <Button
                variant="primary"
                size="sm"
                leftIcon={Plus}
                onClick={() => window.location.href = '/admin/addstudent'}
              >
                Add Student
              </Button>
            }
          >
            <DataTable
              columns={studentColumns}
              data={studentsData}
              pagination={false}
              searchable={false}
            />
          </Card>
        </div>

        {/* Recent Activity - Takes 1 column */}
        <div>
          <Card title="Recent Activity" subtitle="Latest system updates">
            <ActivityFeed />
          </Card>
        </div>
      </div>

      {/* Department Overview */}
      <Card title="Department Overview" subtitle="Student distribution by department">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentsData.map((dept, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/80 dark:bg-dark-700/50 hover:bg-primary-50 dark:hover:bg-dark-700 transition-colors cursor-pointer border border-light-600 dark:border-transparent"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{dept.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${dept.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {dept.change}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{dept.students}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">students</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Layout>
  );
};

export default AdminDashboard;
