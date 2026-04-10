import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Package,
  DollarSign,
  Archive,
  Image as ImageIcon,
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

const ProductsPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample products data
  const productsData = [
    {
      id: 1,
      name: 'Computer Science Textbook',
      sku: 'BK-CS-001',
      category: 'Books',
      price: 89.99,
      stock: 150,
      status: 'in_stock',
      sales: 234,
      image: null,
    },
    {
      id: 2,
      name: 'Engineering Calculator',
      sku: 'EC-ENG-002',
      category: 'Electronics',
      price: 149.99,
      stock: 45,
      status: 'low_stock',
      sales: 567,
      image: null,
    },
    {
      id: 3,
      name: 'Lab Coat - Standard',
      sku: 'LC-LAB-003',
      category: 'Lab Equipment',
      price: 29.99,
      stock: 0,
      status: 'out_of_stock',
      sales: 123,
      image: null,
    },
    {
      id: 4,
      name: 'Wireless Mouse',
      sku: 'WM-IT-004',
      category: 'Electronics',
      price: 34.99,
      stock: 200,
      status: 'in_stock',
      sales: 890,
      image: null,
    },
    {
      id: 5,
      name: 'USB-C Hub',
      sku: 'UH-IT-005',
      category: 'Electronics',
      price: 59.99,
      stock: 78,
      status: 'in_stock',
      sales: 445,
      image: null,
    },
    {
      id: 6,
      name: 'Mechanical Pencil Set',
      sku: 'PS-STD-006',
      category: 'Stationery',
      price: 12.99,
      stock: 500,
      status: 'in_stock',
      sales: 1234,
      image: null,
    },
    {
      id: 7,
      name: 'Notebook - A4',
      sku: 'NB-STD-007',
      category: 'Stationery',
      price: 8.99,
      stock: 12,
      status: 'low_stock',
      sales: 2345,
      image: null,
    },
    {
      id: 8,
      name: 'Webcam HD',
      sku: 'WC-IT-008',
      category: 'Electronics',
      price: 79.99,
      stock: 0,
      status: 'out_of_stock',
      sales: 67,
      image: null,
    },
  ];

  // Table columns configuration
  const columns = [
    {
      key: 'name',
      header: 'Product',
      width: '300px',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-dark-700 border border-dark-600 flex items-center justify-center">
            {row.image ? (
              <img src={row.image} alt={value} className="w-full h-full rounded-xl object-cover" />
            ) : (
              <Package className="w-6 h-6 text-content-disabled" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-content">{value}</p>
            <p className="text-xs text-content-muted">{row.sku}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (value) => <Badge variant="secondary">{value}</Badge>,
    },
    {
      key: 'price',
      header: 'Price',
      render: (value) => (
        <span className="text-sm font-medium text-content">
          ${value.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="text-sm text-content">{value} units</span>
          {row.status === 'low_stock' && (
            <Badge variant="warning" size="sm">Low</Badge>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <Badge
          variant={
            value === 'in_stock'
              ? 'success'
              : value === 'low_stock'
              ? 'warning'
              : 'danger'
          }
        >
          {value.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'sales',
      header: 'Sales',
      render: (value) => (
        <span className="text-sm text-content">{value.toLocaleString()}</span>
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
              setSelectedProduct(row);
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

  // Stats
  const productStats = [
    {
      title: 'Total Products',
      value: '1,234',
      change: 8.2,
      changeType: 'positive',
      icon: Package,
    },
    {
      title: 'Total Sales',
      value: '$45.2K',
      change: 12.5,
      changeType: 'positive',
      icon: DollarSign,
      prefix: '$',
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: -5,
      changeType: 'negative',
      icon: Archive,
    },
    {
      title: 'Out of Stock',
      value: '8',
      change: 2,
      changeType: 'negative',
      icon: Package,
    },
  ];

  const categoryOptions = [
    { value: 'books', label: 'Books' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'stationery', label: 'Stationery' },
    { value: 'lab-equipment', label: 'Lab Equipment' },
  ];

  return (
    <Layout userRole="admin">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-content mb-1">Products</h1>
            <p className="text-content-muted">Manage inventory and product catalog</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" leftIcon={Archive}>
              Manage Categories
            </Button>
            <Button
              variant="primary"
              leftIcon={Plus}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {productStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Products Table */}
      <DataTable
        title="All Products"
        subtitle="Manage your product inventory"
        columns={columns}
        data={productsData}
        selectable
        onRowClick={(row) => console.log('Clicked product:', row)}
      />

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
        description="Add a new product to your catalog"
        size="lg"
        footer={
          <ModalFooter.Save
            onCancel={() => setIsAddModalOpen(false)}
            onSave={() => {
              console.log('Saving product...');
              setIsAddModalOpen(false);
            }}
          />
        }
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input label="Product Name" placeholder="Enter product name" required />
            <Input label="SKU" placeholder="e.g., PRD-001" required />
            <Select
              label="Category"
              options={categoryOptions}
              placeholder="Select category"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price"
                type="number"
                placeholder="0.00"
                prefix="$"
                required
              />
              <Input
                label="Stock Quantity"
                type="number"
                placeholder="0"
                required
              />
            </div>
            <Select
              label="Status"
              options={[
                { value: 'in_stock', label: 'In Stock' },
                { value: 'low_stock', label: 'Low Stock' },
                { value: 'out_of_stock', label: 'Out of Stock' },
              ]}
              placeholder="Select status"
            />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-content mb-2">
                Product Image
              </label>
              <div className="border-2 border-dashed border-dark-600 rounded-xl p-8 text-center hover:border-primary-500/50 transition-colors cursor-pointer">
                <ImageIcon className="w-12 h-12 text-content-disabled mx-auto mb-3" />
                <p className="text-sm text-content-muted">
                  Drag and drop an image here, or click to browse
                </p>
                <p className="text-xs text-content-disabled mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-content mb-2">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-sm text-content placeholder-content-disabled focus:outline-none focus:border-primary-500 resize-none"
                placeholder="Enter product description..."
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product"
        description={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        size="sm"
        footer={
          <ModalFooter.Delete
            onCancel={() => setIsDeleteModalOpen(false)}
            onDelete={() => {
              console.log('Deleting product:', selectedProduct?.id);
              setIsDeleteModalOpen(false);
            }}
          />
        }
      />
    </Layout>
  );
};

export default ProductsPage;
