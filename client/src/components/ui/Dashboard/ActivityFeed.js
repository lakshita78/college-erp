import React from 'react';
import {
  UserPlus,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  MoreHorizontal,
  BookOpen,
  GraduationCap,
  Award,
  Bell,
} from 'lucide-react';
import Avatar from '../Common/Avatar';
import Badge from '../Common/Badge';

const ActivityFeed = ({
  activities = [],
  loading = false,
  maxItems = 5,
  showViewAll = true,
  onViewAll,
}) => {
  const getActivityIcon = (type) => {
    const icons = {
      user: { icon: UserPlus, color: 'bg-primary-500/20 text-primary-400' },
      document: { icon: FileText, color: 'bg-accent-teal/20 text-accent-teal' },
      success: { icon: CheckCircle, color: 'bg-emerald-500/20 text-emerald-400' },
      warning: { icon: AlertCircle, color: 'bg-amber-500/20 text-amber-400' },
      course: { icon: BookOpen, color: 'bg-accent-purple/20 text-accent-purple' },
      student: { icon: GraduationCap, color: 'bg-blue-500/20 text-blue-400' },
      grade: { icon: Award, color: 'bg-rose-500/20 text-rose-400' },
      notice: { icon: Bell, color: 'bg-indigo-500/20 text-indigo-400' },
    };
    return icons[type] || icons.document;
  };

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  // Sample activities if none provided
  const defaultActivities = [
    {
      id: 1,
      type: 'user',
      title: 'New student registered',
      description: 'John Doe registered for Computer Science',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      user: { name: 'John Doe', avatar: null },
    },
    {
      id: 2,
      type: 'grade',
      title: 'Grades submitted',
      description: 'Dr. Smith submitted grades for Data Structures',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      user: { name: 'Dr. Smith', avatar: null },
    },
    {
      id: 3,
      type: 'notice',
      title: 'New notice published',
      description: 'Exam schedule for Fall 2024 released',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      user: { name: 'Admin', avatar: null },
    },
    {
      id: 4,
      type: 'success',
      title: 'Attendance marked',
      description: 'Attendance completed for CS-101',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      user: { name: 'Faculty', avatar: null },
    },
    {
      id: 5,
      type: 'course',
      title: 'Course updated',
      description: 'Database Systems syllabus updated',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      user: { name: 'Dr. Johnson', avatar: null },
    },
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;
  const limitedActivities = displayActivities.slice(0, maxItems);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
            <div className="w-10 h-10 bg-light-600 dark:bg-dark-700 rounded-xl animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-light-600 dark:bg-dark-700 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-light-600 dark:bg-dark-700 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {limitedActivities.map((activity) => {
        const { icon: Icon, color } = getActivityIcon(activity.type);

        return (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-light-200 dark:hover:bg-dark-700/50 transition-colors group cursor-pointer"
          >
            {/* Icon or Avatar */}
            {activity.user ? (
              <Avatar
                src={activity.user.avatar}
                name={activity.user.name}
                size="md"
                status={activity.type === 'success' ? 'online' : undefined}
              />
            ) : (
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-content dark:text-content-dark truncate group-hover:text-primary-400 transition-colors">
                  {activity.title}
                </h4>
                <span className="text-xs text-content-muted dark:text-content-dark-muted whitespace-nowrap ml-2">
                  {getRelativeTime(activity.timestamp)}
                </span>
              </div>
              <p className="text-sm text-content-muted dark:text-content-dark-muted mt-0.5 line-clamp-2">
                {activity.description}
              </p>

              {/* Tags/Badges if any */}
              {activity.tags && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {activity.tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Action menu */}
            <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-light-600 dark:hover:bg-dark-600 text-content-muted dark:text-content-dark-muted transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        );
      })}

      {showViewAll && (
        <button
          onClick={onViewAll}
          className="w-full py-3 text-sm font-medium text-primary-400 hover:text-primary-300 hover:bg-primary-500/10 rounded-xl transition-colors"
        >
          View all activity →
        </button>
      )}
    </div>
  );
};

export default ActivityFeed;
