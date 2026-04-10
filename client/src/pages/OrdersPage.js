import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Truck,
  XCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  CreditCard,
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
  StatCard,
} from '../components/ui';

const OrdersPage = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample orders data
  const ordersData = [
    {
      id: 'ORD-2024-001',
      customer: { name: 'John Smith', email: 'john@example.com', avatar: null },
      date: '2024-01-15',
      items: 3,
      total: 156.97,
      status: 'completed',
      payment: 'paid',
      shipping: 'delivered',
    },
    {
      id: 'ORD-2024-002',
      customer: { name: 'Emily Davis', email: 'emily@example.com', avatar: null },
      date: '2024-01-15',
      items: 1,
      total: 89.99,
      status: 'processing',
      payment: 'paid',
      shipping: 'shipped',
    },
    {
      id: 'ORD-2024-003',
      customer: { name: 'Michael Brown', email: 'michael@example.com', avatar: null },
      date: '2024-01-14',
      items: 5,
      total: 245.50,
      status: 'pending',
      payment: 'pending',
      shipping: 'pending',
    },
    {
      id: 'ORD-2024-004',
      customer: { name: 'Sarah Wilson', email: 'sarah@example.com', avatar: null },
      date: '2024-01-14',
      items: 2,
      total: 67.98,
      status: 'cancelled',
      payment: 'refunded',
      shipping: 'cancelled',
    },
    {
      id: 'ORD-2024-005',
      customer: { name: 'David Lee', email: 'david@example.com', avatar: null },
      date: '2024-01-13',
      items: 4,
      total: 189.96,
      status: 'completed',
      payment: 'paid',
      shipping: 'delivered',
    },
    {
      id: 'ORD-2024-006',
      customer: { name: 'Lisa Anderson', email: 'lisa@example.com', avatar: null },
      date: '2024-01-13',
      items: 2,
      total: 45.98,
      status: 'processing',
      payment: 'paid',
      shipping: 'shipped',
    },
    {
      id: 'ORD-2024-007',
      customer: { name: 'Robert Taylor', email: 'robert@example.com', avatar: null },
      date: '2024-01-12',
      items: 6,
      total: 312.45,
      status: 'pending',
      payment: 'pending',
      shipping: 'pending',
    },
  ];

  // Table columns configuration
  const columns = [
    {
      key: 'id',
      header: 'Order ID',
      render: (value) => (
        <span className="text-sm font-medium text-primary-400">{value}</span>
      ),
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (value) => (
        <div className="flex items-center gap-3">
          <Avatar name={value.name} src={value.avatar} size="sm" />
          <div>
            <p className="text-sm font-medium text-content">{value.name}</p>
            <p className="text-xs text-content-muted">{value.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (value) => (
        <span className="text-sm text-content">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'items',
      header: 'Items',
      render: (value) => (
        <span className="text-sm text-content">{value} items</span>
      ),
    },
    {
      key: 'total',
      header: 'Total',
      render: (value) => (
        <span className="text-sm font-semibold text-content">
          ${value.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => {
        const icons = {
          completed: <CheckCircle className="w-3 h-3" />,
          processing: <Clock className="w-3 h-3" />,
          pending: <Clock className="w-3 h-3" />,
          cancelled: <XCircle className="w-3 h-3" />,
        };
        return (
          <Badge
            variant={
              value === 'completed'
                ? 'success'
                : value === 'processing'
                ? 'primary'
                : value === 'pending'
                ? 'warning'
                : 'danger'
            }
            rounded="full"
          >
            <span className="flex items-center gap-1">
              {icons[value]}
              {value}
            </span>
          </Badge>
        );
      },
    },
    {
      key: 'payment',
      header: 'Payment',
      render: (value) => (
        <Badge
          variant={
            value === 'paid'
              ? 'success'
              : value === 'pending'
              ? 'warning'
              : value === 'refunded'
              ? 'secondary'
              : 'danger'
          }
          size="sm"
        >
          {value}
        </Badge>
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
              setSelectedOrder(row);
              setIsViewModalOpen(true);
            }}
            className="p-2 rounded-lg hover:bg-dark-700 text-content-muted hover:text-primary-400 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Update status', row.id);
            }}
            className="p-2 rounded-lg hover:bg-dark-700 text-content-muted hover:text-content transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  // Order stats
  const orderStats = [
    {
      title: 'Total Orders',
      value: '1,234',
      change: 15.3,
      changeType: 'positive',
      icon: ShoppingCart,
    },
    {
      title: 'Revenue',
      value: '$52.4K',
      change: 22.5,
      changeType: 'positive',
      icon: DollarSign,
      prefix: '$',
    },
    {
      title: 'Pending Orders',
      value: '18',
      change: -5,
      changeType: 'negative',
      icon: Clock,
    },
    {
      title: 'Completed',
      value: '1,156',
      change: 8.2,
      changeType: 'positive',
      icon: CheckCircle,
    },
  ];

  // Order details for modal
  const orderDetails = selectedOrder ? {
    items: [
      { name: 'Computer Science Textbook', qty: 1, price: 89.99 },
      { name: 'Engineering Calculator', qty: 1, price: 49.99 },
      { name: 'Notebook Set', qty: 2, price: 8.50 },
    ],
    shipping: {
      address: '123 Campus Drive, University City, ST 12345',
      method: 'Standard Shipping',
      cost: 5.99,
    },
    timeline: [
      { status: 'Order Placed', time: '2024-01-15 09:30 AM', completed: true },
      { status: 'Payment Confirmed', time: '2024-01-15 09:35 AM', completed: true },
      { status: 'Order Processed', time: '2024-01-15 02:00 PM', completed: true },
      { status: 'Shipped', time: '2024-01-16 10:00 AM', completed: true },
      { status: 'Delivered', time: '2024-01-18 03:45 PM', completed: selectedOrder.status === 'completed' },
    ],
  } : null;

  return (
    <Layout userRole="admin">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-content mb-1">Orders</h1>
            <p className="text-content-muted">Manage and track customer orders</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary">Export Orders</Button>
            <Button variant="primary" leftIcon={Plus}>
              Create Order
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {orderStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Orders Table */}
      <DataTable
        title="All Orders"
        subtitle="View and manage customer orders"
        columns={columns}
        data={ordersData}
        selectable
        onRowClick={(row) => {
          setSelectedOrder(row);
          setIsViewModalOpen(true);
        }}
      />

      {/* View Order Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Order Details - ${selectedOrder?.id}`}
        size="lg"
        footer={
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
            {selectedOrder?.status !== 'completed' && selectedOrder?.status !== 'cancelled' && (
              <>
                <Button variant="secondary">Print Invoice</Button>
                <Button variant="primary">Update Status</Button>
              </>
            )}
          </div>
        }
      >
        {orderDetails && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-dark-700/50 rounded-xl">
                <p className="text-sm text-content-muted">Customer</p>
                <p className="font-medium text-content">{selectedOrder.customer.name}</p>
                <p className="text-sm text-content-muted">{selectedOrder.customer.email}</p>
              </div>
              <div className="p-4 bg-dark-700/50 rounded-xl">
                <p className="text-sm text-content-muted">Order Date</p>
                <p className="font-medium text-content">
                  {new Date(selectedOrder.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-content-muted">
                  {new Date(selectedOrder.date).toLocaleTimeString()}
                </p>
              </div>
              <div className="p-4 bg-dark-700/50 rounded-xl">
                <p className="text-sm text-content-muted">Total Amount</p>
                <p className="font-medium text-content">${selectedOrder.total.toFixed(2)}</p>
                <Badge variant={selectedOrder.payment === 'paid' ? 'success' : 'warning'} size="sm">
                  {selectedOrder.payment}
                </Badge>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-medium text-content mb-3">Order Items</h4>
              <div className="border border-dark-600 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-dark-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-content-muted">Item</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-content-muted">Qty</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-content-muted">Price</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-content-muted">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-600">
                    {orderDetails.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-content">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-content text-center">{item.qty}</td>
                        <td className="px-4 py-3 text-sm text-content text-right">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-content text-right">
                          ${(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-dark-700/30">
                      <td colSpan={3} className="px-4 py-3 text-sm text-content-muted text-right">Subtotal</td>
                      <td className="px-4 py-3 text-sm text-content text-right">
                        ${(selectedOrder.total - orderDetails.shipping.cost).toFixed(2)}
                      </td>
                    </tr>
                    <tr className="bg-dark-700/30">
                      <td colSpan={3} className="px-4 py-3 text-sm text-content-muted text-right">Shipping</td>
                      <td className="px-4 py-3 text-sm text-content text-right">
                        ${orderDetails.shipping.cost.toFixed(2)}
                      </td>
                    </tr>
                    <tr className="bg-dark-700/50">
                      <td colSpan={3} className="px-4 py-3 text-sm font-medium text-content text-right">Total</td>
                      <td className="px-4 py-3 text-lg font-bold text-primary-400 text-right">
                        ${selectedOrder.total.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shipping & Timeline */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-content mb-3">Shipping Address</h4>
                <div className="p-4 bg-dark-700/30 rounded-xl">
                  <p className="text-sm text-content">{orderDetails.shipping.address}</p>
                  <p className="text-sm text-content-muted mt-2">
                    Method: {orderDetails.shipping.method}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-content mb-3">Order Timeline</h4>
                <div className="space-y-3">
                  {orderDetails.timeline.map((event, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${event.completed ? 'bg-emerald-500' : 'bg-dark-600'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${event.completed ? 'text-content' : 'text-content-muted'}`}>
                          {event.status}
                        </p>
                      </div>
                      <p className="text-xs text-content-muted">{event.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default OrdersPage;
