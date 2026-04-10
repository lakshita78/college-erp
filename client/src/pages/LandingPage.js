import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  GraduationCap,
  Users,
  BookOpen,
  ArrowRight,
  Shield,
  UserCircle,
  School,
  ChevronRight,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { Button, Card } from '../components/ui';

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with role-based access control',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Users,
      title: 'Multi-Role Support',
      description: 'Dedicated portals for Admin, Faculty, and Students',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: BookOpen,
      title: 'Academic Management',
      description: 'Complete solution for courses, grades, and attendance',
      color: 'from-accent-purple to-accent-purple/80',
    },
    {
      icon: GraduationCap,
      title: 'Student Success',
      description: 'Track progress, manage records, and foster growth',
      color: 'from-accent-teal to-accent-teal/80',
    },
  ];

  const loginOptions = [
    {
      role: 'Admin',
      description: 'System Administration',
      icon: Shield,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20',
      link: '/login/adminlogin',
    },
    {
      role: 'Faculty',
      description: 'Teaching Staff Portal',
      icon: UserCircle,
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-500/10',
      borderColor: 'border-primary-500/20',
      link: '/login/facultylogin',
    },
    {
      role: 'Student',
      description: 'Student Access Portal',
      icon: School,
      color: 'from-accent-teal to-accent-teal/80',
      bgColor: 'bg-accent-teal/10',
      borderColor: 'border-accent-teal/20',
      link: '/login/studentlogin',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-content">ERP Portal</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-content-muted hover:text-content transition-colors">
                Features
              </a>
              <a href="#login" className="text-content-muted hover:text-content transition-colors">
                Login
              </a>
              <Link to="/login/adminlogin">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-dark-900 to-accent-purple/5 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Now with Dark Mode</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-content mb-6 leading-tight">
              College ERP
              <span className="block text-gradient">Management System</span>
            </h1>
            <p className="text-lg sm:text-xl text-content-muted mb-8 max-w-2xl mx-auto">
              A comprehensive solution for managing your educational institution. 
              Streamline administration, enhance learning, and drive student success.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="#login">
                <Button variant="primary" size="lg" rightIcon={ArrowRight}>
                  Explore Features
                </Button>
              </Link>
              <Link to="#features">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-dark-600 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Students' },
              { value: '500+', label: 'Faculty' },
              { value: '50+', label: 'Departments' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-content-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-content mb-4">
              Powerful Features for Education
            </h2>
            <p className="text-content-muted max-w-2xl mx-auto">
              Everything you need to manage your institution efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  padding="lg"
                  className="text-center hover:border-primary-500/30 transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4 shadow-dark group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-content mb-2">{feature.title}</h3>
                  <p className="text-sm text-content-muted">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section id="login" className="py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-content mb-4">
              Choose Your Portal
            </h2>
            <p className="text-content-muted max-w-2xl mx-auto">
              Select your role to access the appropriate dashboard
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {loginOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Link
                  key={index}
                  to={option.link}
                  className={`group relative overflow-hidden rounded-2xl ${option.bgColor} ${option.borderColor} border-2 p-8 hover:scale-[1.02] transition-all duration-300 block z-10`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-6 shadow-dark group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-content mb-2">{option.role}</h3>
                    <p className="text-content-muted mb-6">{option.description}</p>
                    <div className="flex items-center text-primary-400 font-medium group-hover:text-primary-300 transition-colors">
                      Login Now
                      <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-content mb-6">
                Why Choose Our ERP System?
              </h2>
              <p className="text-content-muted mb-8">
                Our comprehensive ERP solution is designed specifically for educational institutions, 
                providing all the tools you need to succeed.
              </p>
              <div className="space-y-4">
                {[
                  'Real-time data synchronization across all modules',
                  'Mobile-friendly responsive design',
                  'Advanced analytics and reporting capabilities',
                  'Seamless integration with existing systems',
                  '24/7 support and regular updates',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-content">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-purple/20 rounded-3xl blur-3xl" />
              <Card className="relative" gradient>
                <div className="aspect-square rounded-2xl bg-dark-700/50 flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="w-24 h-24 text-primary-400 mx-auto mb-4" />
                    <p className="text-content-muted">ERP Dashboard Preview</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-dark-600 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-content">ERP Portal</span>
            </div>
            <p className="text-content-muted text-sm">
              © 2024 College ERP System. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-content-muted">
              <a href="#" className="hover:text-content transition-colors">Privacy</a>
              <a href="#" className="hover:text-content transition-colors">Terms</a>
              <a href="#" className="hover:text-content transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
