import React, { useState } from 'react';
import {
  Download,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Calendar,
  Filter,
  Printer,
  Share2,
  ChevronDown,
} from 'lucide-react';
import {
  Layout,
  Card,
  CardGrid,
  Button,
  Badge,
  Select,
  StatCard,
  ActivityFeed,
} from '../components/ui';

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState(null);

  // Report categories
  const reportCategories = [
    {
      id: 'academic',
      title: 'Academic Reports',
      description: 'Student performance, grades, and attendance',
      icon: FileText,
      color: 'from-primary-500 to-primary-600',
      reports: [
        { name: 'Student Performance Report', type: 'pdf', size: '2.4 MB' },
        { name: 'Grade Distribution Analysis', type: 'xlsx', size: '1.8 MB' },
        { name: 'Course Completion Rates', type: 'pdf', size: '1.2 MB' },
        { name: 'Faculty Evaluation Summary', type: 'pdf', size: '3.1 MB' },
      ],
    },
    {
      id: 'enrollment',
      title: 'Enrollment Reports',
      description: 'Admission trends and student demographics',
      icon: Users,
      color: 'from-accent-teal to-accent-teal/80',
      reports: [
        { name: 'Annual Enrollment Statistics', type: 'pdf', size: '4.5 MB' },
        { name: 'Department-wise Admissions', type: 'xlsx', size: '2.2 MB' },
        { name: 'Student Demographics', type: 'pdf', size: '1.9 MB' },
        { name: 'International Student Report', type: 'xlsx', size: '1.5 MB' },
      ],
    },
    {
      id: 'financial',
      title: 'Financial Reports',
      description: 'Revenue, expenses, and budget analysis',
      icon: BarChart3,
      color: 'from-emerald-500 to-emerald-600',
      reports: [
        { name: 'Quarterly Revenue Report', type: 'pdf', size: '3.8 MB' },
        { name: 'Department Budget Analysis', type: 'xlsx', size: '2.9 MB' },
        { name: 'Fee Collection Summary', type: 'pdf', size: '2.1 MB' },
        { name: 'Expense Breakdown', type: 'xlsx', size: '1.7 MB' },
      ],
    },
    {
      id: 'operational',
      title: 'Operational Reports',
      description: 'Infrastructure and resource utilization',
      icon: TrendingUp,
      color: 'from-amber-500 to-amber-600',
      reports: [
        { name: 'Library Usage Statistics', type: 'pdf', size: '1.3 MB' },
        { name: 'Lab Equipment Utilization', type: 'xlsx', size: '2.4 MB' },
        { name: 'Transportation Report', type: 'pdf', size: '1.6 MB' },
        { name: 'Hostel Occupancy Analysis', type: 'xlsx', size: '1.2 MB' },
      ],
    },
  ];

  // Quick stats for reports
  const reportStats = [
    {
      title: 'Reports Generated',
      value: '156',
      change: 24,
      changeType: 'positive',
      icon: FileText,
    },
    {
      title: 'This Month',
      value: '42',
      change: 12,
      changeType: 'positive',
      icon: Calendar,
    },
    {
      title: 'Scheduled',
      value: '8',
      change: 0,
      changeType: 'neutral',
      icon: Calendar,
    },
    {
      title: 'Downloads',
      value: '1.2K',
      change: 45,
      changeType: 'positive',
      icon: Download,
    },
  ];

  const periodOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
  ];

  const getFileIcon = (type) => {
    const colors = {
      pdf: 'bg-rose-500/20 text-rose-400',
      xlsx: 'bg-emerald-500/20 text-emerald-400',
      docx: 'bg-primary-500/20 text-primary-400',
    };
    return colors[type] || 'bg-dark-600 text-content-muted';
  };

  return (
    <Layout userRole="admin">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-content mb-1">Reports</h1>
            <p className="text-content-muted">Generate and download institutional reports</p>
          </div>
          <div className="flex items-center gap-3">
            <Select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              options={periodOptions}
              size="sm"
            />
            <Button variant="primary" leftIcon={FileText}>
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reportStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {reportCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.id} padding="lg" className="hover:border-primary-500/30 transition-colors">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-dark`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-content">{category.title}</h3>
                  <p className="text-sm text-content-muted mt-1">{category.description}</p>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>

              <div className="space-y-3">
                {category.reports.map((report, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-dark-700/50 hover:bg-dark-700 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${getFileIcon(report.type)} flex items-center justify-center`}>
                        <span className="text-xs font-bold uppercase">{report.type}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-content group-hover:text-primary-400 transition-colors">
                          {report.name}
                        </p>
                        <p className="text-xs text-content-muted">{report.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-dark-600 text-content-muted hover:text-primary-400 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-dark-600 text-content-muted hover:text-content transition-colors">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-dark-600 text-content-muted hover:text-content transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity & Scheduled Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Recent Report Activity" subtitle="Reports generated in the last 30 days">
            <ActivityFeed />
          </Card>
        </div>
        <div>
          <Card title="Scheduled Reports" subtitle="Auto-generated reports">
            <div className="space-y-4">
              {[
                { name: 'Weekly Attendance', frequency: 'Weekly', next: 'Mon, Jan 22', status: 'active' },
                { name: 'Monthly Financial', frequency: 'Monthly', next: 'Feb 1, 2024', status: 'active' },
                { name: 'Quarterly Grades', frequency: 'Quarterly', next: 'Mar 31, 2024', status: 'paused' },
                { name: 'Annual Enrollment', frequency: 'Yearly', next: 'Jun 30, 2024', status: 'active' },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-dark-700/50">
                  <div>
                    <p className="text-sm font-medium text-content">{report.name}</p>
                    <p className="text-xs text-content-muted">{report.frequency} • Next: {report.next}</p>
                  </div>
                  <Badge
                    variant={report.status === 'active' ? 'success' : 'warning'}
                    size="sm"
                    rounded="full"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${report.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      {report.status}
                    </span>
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-dark-600">
              <Button variant="ghost" size="sm" fullWidth>
                Manage Scheduled Reports
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Custom Report Builder CTA */}
      <Card className="mt-8 bg-gradient-to-br from-primary-500/10 to-accent-purple/10 border-primary-500/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-content">Custom Report Builder</h3>
              <p className="text-content-muted">Create custom reports with specific filters and metrics</p>
            </div>
          </div>
          <Button variant="primary" size="lg" leftIcon={FileText}>
            Create Custom Report
          </Button>
        </div>
      </Card>
    </Layout>
  );
};

export default ReportsPage;
