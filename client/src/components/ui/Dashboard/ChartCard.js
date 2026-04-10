import React from 'react';
import Card from '../Common/Card';

const ChartCard = ({
  title,
  subtitle,
  children,
  loading = false,
  action,
  height = 300,
  legend,
}) => {
  if (loading) {
    return (
      <Card title={title} subtitle={subtitle}>
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-dark-700 rounded-xl" />
          <div className="flex justify-center gap-4">
            <div className="h-4 w-20 bg-dark-700 rounded" />
            <div className="h-4 w-20 bg-dark-700 rounded" />
            <div className="h-4 w-20 bg-dark-700 rounded" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={title}
      subtitle={subtitle}
      action={action}
      padding="lg"
    >
      <div style={{ height }} className="w-full">
        {children}
      </div>
      {legend && (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-dark-600">
          {legend.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-content-muted">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default ChartCard;
