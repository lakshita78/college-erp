import React, { useState } from 'react';
import {
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
} from 'lucide-react';
import {
  Layout,
  DataTable,
  Card,
  Button,
  Modal,
  ModalFooter,
  Badge,
  Avatar,
  Input,
  Select,
} from '../components/ui';

const UsersPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample users data
  const usersData = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@erp.edu',
      role: 'Faculty',
      department: 'Computer Science',
      status: 'active',
      joined: '2022-03-15',
      phone: '+1 (555) 123-4567',
      avatar: null,
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@erp.edu',
      role: 'Student',
      department: 'Electronics',
      status: 'active',
      joined: '2023-08-20',
      phone: '+1 (555) 234-5678',
      avatar: null,
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@erp.edu',
      role: 'Student',
      department: 'Computer Science',
      status: 'inactive',
      joined: '2021-09-10',
      phone: '+1 (555) 345-6789',
      avatar: null,
    },
    {
      id: 4,
      name: 'Prof. Michael Brown',
      email: 'michael.brown@erp.edu',
      role: 'Faculty',
      department: 'Mechanical',
      status: 'active',
      joined: '2020-01-05',
      phone: '+1 (555) 456-7890',
      avatar: null,
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@erp.edu',
      role: 'Admin',
      department: 'Administration',
      status: 'active',
      joined: '2019-06-12',
      phone: '+1 (555) 567-8901',
      avatar: null,
    },
    {
      id: 6,
      name: 'David Wilson',
      email: 'david.wilson@erp.edu',
      role: 'Student',
      department: 'Civil',
      status: 'active',
      joined: '2022-01-18',
      phone: '+1 (555) 678-9012',
      avatar: null,
    },
    {
      id: 7,
      name: 'Dr. Jennifer Lee',
      email: 'jennifer.lee@erp.edu',
      role: 'Faculty',
      department: 'Business',
      status: 'active',
      joined: '2021-11-30',
      phone: '+1 (555) 789-0123',
      avatar: null,
    },
    {
      id: 8,
      name: 'Robert Taylor',
      email: 'robert.taylor@erp.edu',
      role: 'Student',
      department: 'Computer Science',
      status: 'suspended',
      joined: '2023-05-22',
      phone: '+1 (555) 890-1234',
      avatar: null,
    },
  ];

  // Table columns configuration
  const columns = [
    {
      key: 'name',
      header: 'User',
      width: '250px',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} src={row.avatar} size="md" />
          <div>
            <p className="text-sm font-medium text-content">{value}</p>
            <p className="text-xs text-content-muted">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (value) => (
        <Badge
          variant={
            value === 'Admin'
              ? 'accent'
              : value === 'Faculty'
              ? 'primary'
              : 'secondary'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: (value) => <span className="text-sm text-content">{value}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge
          variant={
            value === 'active'
              ? 'success'
              : value === 'inactive'
              ? 'warning'
              : 'danger'
          }
          rounded="full"
        >
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                value === 'active'
                  ? 'bg-emerald-400'
                  : value === 'inactive'
                  ? 'bg-amber-400'
                  : 'bg-rose-400'
              }`}
            />
            {value}
          </span>
        </Badge>
      ),
    },
    {
      key: 'joined',
      header: 'Joined',
      render: (value) => (
        <span className="text-sm text-content-muted">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit', row.id);
            }}
            className="p-2 rounded-lg hover:bg-dark-700 text-content-muted hover:text-primary-400 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedUser(row);
              setIsDeleteModalOpen(true);
            }}
            className="p-2 rounded-lg hover:bg-dark-700 text-content-muted hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Role options for filter
  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'faculty', label: 'Faculty' },
    { value: 'student', label: 'Student' },
  ];

  // Department options for filter
  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'mechanical', label: 'Mechanical' },
    { value: 'civil', label: 'Civil' },
    { value: 'business', label: 'Business' },
  ];

  return (
    <Layout userRole="admin">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-content mb-1">Users</h1>
            <p className="text-content-muted">
              Manage students, faculty, and administrators
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              leftIcon={Plus}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add User
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card padding="sm" className="border-l-4 border-l-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-content-muted">Total Users</p>
              <p className="text-2xl font-bold text-content">2,547</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary-400">👥</span>
            </div>
          </div>
        </Card>
        <Card padding="sm" className="border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-content-muted">Active Users</p>
              <p className="text-2xl font-bold text-content">2,234</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <span className="text-lg font-bold text-emerald-400">✓</span>
            </div>
          </div>
        </Card>
        <Card padding="sm" className="border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-content-muted">New This Month</p>
              <p className="text-2xl font-bold text-content">128</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <span className="text-lg font-bold text-amber-400">+</span>
            </div>
          </div>
        </Card>
        <Card padding="sm" className="border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-content-muted">Suspended</p>
              <p className="text-2xl font-bold text-content">12</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
              <span className="text-lg font-bold text-rose-400">!</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <DataTable
        title="All Users"
        subtitle="Manage user accounts and permissions"
        columns={columns}
        data={usersData}
        selectable
        onRowClick={(row) => console.log('Clicked row:', row)}
      />

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
        description="Create a new user account"
        footer={
          <ModalFooter.Save
            onCancel={() => setIsAddModalOpen(false)}
            onSave={() => {
              console.log('Saving user...');
              setIsAddModalOpen(false);
            }}
          />
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Enter first name" required />
            <Input label="Last Name" placeholder="Enter last name" required />
          </div>
          <Input
            label="Email"
            type="email"
            placeholder="user@erp.edu"
            required
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Role"
              options={roleOptions.slice(1)}
              placeholder="Select role"
              required
            />
            <Select
              label="Department"
              options={departmentOptions.slice(1)}
              placeholder="Select department"
              required
            />
          </div>
          <Select
            label="Status"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            placeholder="Select status"
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
        size="sm"
        footer={
          <ModalFooter.Delete
            onCancel={() => setIsDeleteModalOpen(false)}
            onDelete={() => {
              console.log('Deleting user:', selectedUser?.id);
              setIsDeleteModalOpen(false);
            }}
          />
        }
      />
    </Layout>
  );
};

export default UsersPage;
