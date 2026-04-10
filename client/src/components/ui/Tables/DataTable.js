import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import Button from '../Common/Button';
import Badge from '../Common/Badge';
import Avatar from '../Common/Avatar';
import Input from '../Common/Input';

const DataTable = ({
  columns = [],
  data = [],
  title,
  subtitle,
  loading = false,
  searchable = true,
  filterable = true,
  exportable = true,
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50, 100],
  selectable = false,
  onRowClick,
  actions,
  emptyState: EmptyState,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(pageSize);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Searching
  const filteredData = useMemo(() => {
    if (!searchQuery) return getSortedData;

    return getSortedData.filter((row) =>
      columns.some((col) => {
        const value = row[col.key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [getSortedData, searchQuery, columns]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage, pagination]);

  // Row selection
  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((row) => row.id));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Export
  const handleExport = () => {
    const csv = [
      columns.map((col) => col.header).join(','),
      ...filteredData.map((row) =>
        columns.map((col) => {
          const value = row[col.key];
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'export'}.csv`;
    a.click();
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ChevronsUpDown className="w-4 h-4 text-content-disabled" />;
    if (sortConfig.direction === 'asc') return <ChevronUp className="w-4 h-4 text-primary-400" />;
    return <ChevronDown className="w-4 h-4 text-primary-400" />;
  };

  // Default cell renderers
  const defaultRenderers = {
    badge: (value, variant = 'default') => <Badge variant={variant}>{value}</Badge>,
    avatar: (value, name) => <Avatar src={value} name={name} size="sm" />,
    date: (value) => new Date(value).toLocaleDateString(),
    datetime: (value) => new Date(value).toLocaleString(),
    currency: (value, currency = 'USD') =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value),
    number: (value) => new Intl.NumberFormat('en-US').format(value),
    boolean: (value) => <Badge variant={value ? 'success' : 'danger'}>{value ? 'Yes' : 'No'}</Badge>,
  };

  return (
    <div className={`bg-white dark:bg-dark-800 rounded-2xl border border-light-600 dark:border-dark-600 overflow-hidden ${className}`}>
      {/* Header */}
      {(title || searchable || filterable || exportable) && (
        <div className="p-4 border-b border-light-600 dark:border-dark-600">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {title && (
              <div>
                <h3 className="text-lg font-semibold text-content">{title}</h3>
                {subtitle && <p className="text-sm text-content-muted">{subtitle}</p>}
              </div>
            )}

            <div className="flex items-center gap-2">
              {searchable && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted dark:text-content-dark-muted" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-light-100 dark:bg-dark-700 border border-light-600 dark:border-dark-600 rounded-xl text-sm text-content dark:text-content-dark placeholder-content-muted dark:placeholder-content-dark-muted focus:outline-none focus:border-primary-500 transition-all w-64"
                  />
                </div>
              )}

              {filterable && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  leftIcon={Filter}
                >
                  Filter
                </Button>
              )}

              {exportable && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleExport}
                  leftIcon={Download}
                >
                  Export
                </Button>
              )}

              {actions}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-light-100 dark:bg-dark-700/50">
            <tr>
              {selectable && (
                <th className="px-4 py-3 w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-light-500 dark:border-dark-500 bg-light-100 dark:bg-dark-700 text-primary-500 focus:ring-primary-500"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-semibold text-content-muted uppercase tracking-wider ${
                    col.sortable !== false ? 'cursor-pointer hover:text-content' : ''
                  }`}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  style={{ width: col.width }}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable !== false && getSortIcon(col.key)}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-600 dark:divide-dark-600">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {selectable && <td className="px-4 py-4"><div className="w-4 h-4 bg-light-600 dark:bg-dark-600 rounded" /></td>}
                  {columns.map((_, j) => (
                    <td key={j} className="px-4 py-4">
                      <div className="h-4 bg-light-600 dark:bg-dark-600 rounded w-3/4" />
                    </td>
                  ))}
                  <td className="px-4 py-4"><div className="w-8 h-8 bg-light-600 dark:bg-dark-600 rounded" /></td>
                </tr>
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 2 : 1)} className="px-4 py-12 text-center">
                  {EmptyState || (
                    <div className="text-content-muted">
                      <p className="text-lg font-medium">No data available</p>
                      <p className="text-sm mt-1">Try adjusting your filters or search query</p>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  onClick={() => onRowClick?.(row)}
                  className={`
                    transition-colors duration-150
                    ${onRowClick ? 'cursor-pointer hover:bg-light-200 dark:hover:bg-dark-700/50' : 'hover:bg-light-100 dark:hover:bg-dark-700/30'}
                    ${selectedRows.includes(row.id) ? 'bg-primary-500/5' : ''}
                    ${index % 2 === 1 ? 'bg-light-100 dark:bg-dark-800/50' : ''}
                  `}
                >
                  {selectable && (
                    <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="w-4 h-4 rounded border-light-500 dark:border-dark-500 bg-light-100 dark:bg-dark-700 text-primary-500 focus:ring-primary-500"
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-4">
                      {col.render ? (
                        col.render(row[col.key], row)
                      ) : (
                        <span className="text-sm text-content">{row[col.key]}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-4">
                    <button className="p-2 rounded-lg hover:bg-dark-600 text-content-muted hover:text-content transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && !loading && filteredData.length > 0 && (
        <div className="px-4 py-4 border-t border-dark-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-content-muted">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
              {filteredData.length} results
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-dark-700 border border-dark-600 rounded-lg text-sm text-content focus:outline-none focus:border-primary-500"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>{size} / page</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`
                      w-8 h-8 rounded-lg text-sm font-medium transition-colors
                      ${currentPage === pageNum
                        ? 'bg-primary-500 text-white'
                        : 'hover:bg-dark-700 text-content-muted hover:text-content'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
