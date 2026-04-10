import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  FileText,
  Calendar,
  TrendingUp,
  Bell,
  Clock,
  Award,
  AlertCircle,
} from 'lucide-react';
import {
  Layout,
  StatCard,
  Card,
  Button,
  Badge,
  ActivityFeed,
} from '../components/ui';
import {
  getSubject,
  getTestResult,
  getAttendance,
} from '../redux/actions/studentActions';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const student = store.student?.studentData;

  useEffect(() => {
    if (student?._id) {
      dispatch(getSubject(student._id));
      dispatch(getTestResult(student._id));
      dispatch(getAttendance(student._id));
    }
  }, [dispatch, student?._id]);

  // Stats for student
  const stats = [
    {
      title: 'Enrolled Courses',
      value: store.student?.subjectData?.length || '6',
      change: 0,
      changeType: 'neutral',
      icon: BookOpen,
    },
    {
      title: 'Attendance',
      value: '85%',
      change: 2.5,
      changeType: 'positive',
      icon: ClipboardCheck,
    },
    {
      title: 'Test Results',
      value: store.student?.testResults?.length || '4',
      change: 0,
      changeType: 'neutral',
      icon: FileText,
    },
    {
      title: 'Current CGPA',
      value: '8.5',
      change: 0.3,
      changeType: 'positive',
      icon: TrendingUp,
    },
  ];

  // Quick actions for student
  const quickActions = [
    {
      id: 1,
      label: 'View Subjects',
      icon: BookOpen,
      color: 'from-primary-500 to-primary-600',
      onClick: () => window.location.href = '/student/subjectlist',
    },
    {
      id: 2,
      label: 'Check Attendance',
      icon: ClipboardCheck,
      color: 'from-accent-teal to-accent-teal/80',
      onClick: () => window.location.href = '/student/attendance',
    },
    {
      id: 3,
      label: 'Test Results',
      icon: FileText,
      color: 'from-accent-purple to-accent-purple/80',
      onClick: () => window.location.href = '/student/testresult',
    },
    {
      id: 4,
      label: 'My Profile',
      icon: GraduationCap,
      color: 'from-emerald-500 to-emerald-600',
      onClick: () => window.location.href = '/student/profile',
    },
  ];

  // Schedule data
  const schedule = [
    { time: '09:00 AM', subject: 'Data Structures', room: 'Lab 101', type: 'Lab' },
    { time: '11:00 AM', subject: 'Database Systems', room: 'Room 302', type: 'Theory' },
    { time: '02:00 PM', subject: 'Computer Networks', room: 'Room 205', type: 'Theory' },
    { time: '04:00 PM', subject: 'Web Development', room: 'Lab 105', type: 'Lab' },
  ];

  // Recent notices
  const notices = [
    {
      title: 'Mid-term Exam Schedule Released',
      date: 'Today',
      type: 'Exam',
      priority: 'high',
    },
    {
      title: 'Fee Payment Deadline Extended',
      date: '2 days ago',
      type: 'General',
      priority: 'medium',
    },
    {
      title: 'Campus Recruitment Drive',
      date: '3 days ago',
      type: 'Placement',
      priority: 'high',
    },
  ];

  return (
    <Layout
      userRole="student"
      user={{
        name: student?.name || 'Student',
        role: student?.department || 'Department',
      }}
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-content mb-2">
          Welcome back, {student?.name?.split(' ')[0] || 'Student'}!
        </h1>
        <p className="text-content-muted">
          Here's what's happening with your academic journey today.
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
        {/* Today's Schedule - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card
            title="Today's Schedule"
            subtitle="Your classes for today"
            action={
              <Button variant="ghost" size="sm" leftIcon={Calendar}>
                Full Calendar
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
                    <p className="text-sm text-content-muted">Room {item.room}</p>
                  </div>
                  <Badge
                    variant={item.type === 'Lab' ? 'primary' : 'secondary'}
                    size="sm"
                  >
                    {item.type}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Notices - Takes 1 column */}
        <div>
          <Card title="Notices" subtitle="Important announcements">
            <div className="space-y-4">
              {notices.map((notice, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notice.priority === 'high' ? 'bg-rose-400' : 'bg-amber-400'
                    }`} />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-content mb-1">
                        {notice.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" size="sm">
                          {notice.type}
                        </Badge>
                        <span className="text-xs text-content-muted">{notice.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Progress & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic Progress */}
        <Card title="Academic Progress" subtitle="Current semester overview">
          <div className="space-y-6">
            {[
              { subject: 'Data Structures', progress: 85, grade: 'A' },
              { subject: 'Database Systems', progress: 78, grade: 'B+' },
              { subject: 'Computer Networks', progress: 92, grade: 'A+' },
              { subject: 'Web Development', progress: 88, grade: 'A' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-content">{item.subject}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">{item.grade}</Badge>
                    <span className="text-sm text-content-muted">{item.progress}%</span>
                  </div>
                </div>
                <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card title="Achievements" subtitle="Your milestones">
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Award, title: 'Dean\'s List', desc: 'Top 10%', color: 'text-amber-400' },
              { icon: ClipboardCheck, title: 'Perfect Attendance', desc: '3 months', color: 'text-emerald-400' },
              { icon: FileText, title: 'Project Excellence', desc: 'Best Project', color: 'text-primary-400' },
              { icon: AlertCircle, title: 'Assignment Pro', desc: '100% on time', color: 'text-accent-purple' },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors text-center"
              >
                <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                <h4 className="text-sm font-medium text-content">{item.title}</h4>
                <p className="text-xs text-content-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
