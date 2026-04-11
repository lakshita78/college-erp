import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { adminSignIn } from '../../redux/actions/adminActions';
import { Link } from 'react-router-dom';
import {
  Shield,
  Eye,
  EyeOff,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Button, Input, Card } from '../ui';

const AdminLoginNew = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
      setLoading(false);
      setUsername('');
      setPassword('');
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(adminSignIn({ username, password }, navigate));
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-purple/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-3 text-white">
            <Building2 className="w-8 h-8" />
            <span className="text-xl font-bold">ERP Portal</span>
          </Link>
          
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">
              Admin Portal
            </h2>
            <p className="text-gray-400 mb-8">
              Access comprehensive tools to manage your institution efficiently.
            </p>
            <div className="space-y-3">
              {[
                'Manage students, faculty, and courses',
                'Generate reports and analytics',
                'Control system settings and permissions',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-gray-400 text-sm">
            © 2024 College ERP System
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">ERP Portal</span>
          </div>

          <Card padding="lg" className="border border-dark-600">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mx-auto mb-4 shadow-dark">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admin Login</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your credentials to access the admin dashboard
              </p>
            </div>

            <form onSubmit={login} className="space-y-6">
              <Input
                label="Username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                leftIcon={Shield}
                error={error.usernameError}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                leftIcon={Lock}
                error={error.passwordError}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-dark-500 bg-dark-700 text-primary-500 focus:ring-primary-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <Link to="#" className="text-sm text-primary-400 hover:text-primary-300">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={loading}
              >
                Sign In
              </Button>

              {(error.usernameError || error.passwordError) && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <p className="text-sm text-rose-400 text-center">
                    {error.usernameError || error.passwordError}
                  </p>
                </div>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-dark-600">
              <Link
                to="/"
                className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </Link>
            </div>
          </Card>

          {/* Other Login Options */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Other login options</p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/login/facultylogin">
                <Button variant="ghost" size="sm">
                  Faculty
                </Button>
              </Link>
              <span className="text-dark-500">|</span>
              <Link to="/login/studentlogin">
                <Button variant="ghost" size="sm">
                  Student
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginNew;
