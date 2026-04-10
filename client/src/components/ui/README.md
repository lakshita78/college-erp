# ERP UI Component Library

A modern, professional React UI component library designed for enterprise ERP systems with a sophisticated dark theme.

## Features

- **Dark Mode First**: Sophisticated dark theme with carefully selected color palette
- **Accessible**: WCAG AA compliant contrast ratios
- **Responsive**: Mobile-first design approach
- **Customizable**: Extensive Tailwind CSS configuration
- **Enterprise Ready**: Professional layouts for admin dashboards

## Color Palette

### Base Colors
- `dark-900`: #0f1419 (Main background)
- `dark-800`: #1a1f2e (Cards, elevated surfaces)
- `dark-700`: #212737 (Inputs, secondary surfaces)
- `dark-600`: #2a3245 (Borders, dividers)

### Accent Colors
- `primary-500`: #3b82f6 (Primary actions)
- `accent-teal`: #14b8a6
- `accent-purple`: #8b5cf6
- `accent-emerald`: #10b981
- `accent-rose`: #f43f5e

## Component Usage

### Layout Components

#### Layout
Main layout wrapper with sidebar, header, and footer.

```jsx
import { Layout } from './components/ui';

<Layout userRole="admin" user={{ name: 'Admin', role: 'Administrator' }}>
  <YourPageContent />
</Layout>
```

**Props:**
- `userRole`: 'admin' | 'faculty' | 'student'
- `user`: Object with name, email, role, avatar

### Common Components

#### Button
Multi-variant button component.

```jsx
import { Button } from './components/ui';

<Button variant="primary" size="md" loading={false}>
  Click Me
</Button>
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `accent`

**Sizes:** `xs`, `sm`, `md`, `lg`, `xl`

#### Input
Form input with built-in validation states.

```jsx
import { Input } from './components/ui';

<Input
  label="Email"
  type="email"
  placeholder="user@example.com"
  error={errorMessage}
  helperText="We'll never share your email"
/>
```

#### Card
Flexible card container with optional gradient borders.

```jsx
import { Card, CardGrid } from './components/ui';

<Card title="Card Title" subtitle="Optional subtitle" gradient hover>
  Content here
</Card>

<CardGrid columns={3} gap={6}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</CardGrid>
```

#### Modal
Accessible modal with pre-built footer variants.

```jsx
import { Modal, ModalFooter } from './components/ui';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  footer={<ModalFooter.Confirm onCancel={handleClose} onConfirm={handleConfirm} />}
>
  Modal content
</Modal>
```

#### Select
Styled select dropdown.

```jsx
import { Select } from './components/ui';

<Select
  label="Category"
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]}
/>
```

#### Badge
Status indicator badges.

```jsx
import { Badge } from './components/ui';

<Badge variant="success" size="md" rounded="full">Active</Badge>
```

**Variants:** `default`, `primary`, `success`, `warning`, `danger`, `info`, `accent`, `outline`, `ghost`

#### Avatar
User avatar with fallback initials.

```jsx
import { Avatar } from './components/ui';

<Avatar src="/path/to/image.jpg" name="John Doe" size="md" status="online" />
```

### Dashboard Components

#### StatCard
Statistics display card with trend indicators.

```jsx
import { StatCard } from './components/ui';

<StatCard
  title="Total Revenue"
  value="$45,231"
  change={12.5}
  changeType="positive"
  icon={DollarSign}
/>
```

#### ActivityFeed
Recent activity timeline.

```jsx
import { ActivityFeed } from './components/ui';

<ActivityFeed
  activities={[
    {
      id: 1,
      type: 'user',
      title: 'New registration',
      description: 'John Doe registered',
      timestamp: new Date().toISOString(),
      user: { name: 'John Doe', avatar: null }
    }
  ]}
/>
```

#### QuickActions
Action button grid for common tasks.

```jsx
import { QuickActions } from './components/ui';

<QuickActions
  actions={[
    { id: 1, label: 'Add Student', icon: Plus, color: 'from-primary-500 to-primary-600', onClick: () => {} },
  ]}
/>
```

### Table Components

#### DataTable
Full-featured data table with sorting, filtering, and pagination.

```jsx
import { DataTable } from './components/ui';

<DataTable
  columns={[
    { key: 'name', header: 'Name', render: (value) => <span>{value}</span> },
    { key: 'email', header: 'Email' },
  ]}
  data={[
    { id: 1, name: 'John', email: 'john@example.com' },
  ]}
  searchable
  filterable
  pagination
  pageSize={10}
  selectable
  onRowClick={(row) => console.log(row)}
/>
```

## Page Examples

The library includes five fully-implemented example pages:

1. **DashboardPage** - Main dashboard with stats, charts, and activity feed
2. **UsersPage** - User management with CRUD operations
3. **ProductsPage** - Product catalog with inventory management
4. **OrdersPage** - Order processing and tracking
5. **ReportsPage** - Report generation and download center

## Installation

1. Install required dependencies:
```bash
npm install lucide-react
```

2. Update `tailwind.config.js` with the provided configuration

3. Import and use components:
```jsx
import { Layout, Card, Button, DataTable } from './components/ui';
```

## Customization

### Extending the Theme

Add custom colors in `tailwind.config.js`:

```javascript
colors: {
  'custom-brand': '#your-color',
}
```

### Custom Components

Create new components following the existing pattern:

```jsx
import React from 'react';

const CustomComponent = ({ variant = 'default', className = '', children }) => {
  const variants = {
    default: 'bg-dark-800',
    primary: 'bg-primary-500',
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default CustomComponent;
```

## Accessibility

All components include:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance (WCAG AA)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
