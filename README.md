<<<<<<< HEAD
# 🎓 College ERP

A comprehensive **College ERP (Enterprise Resource Planning)** system built with the MERN stack, featuring a modern dual-themed UI for managing academic operations efficiently.

## ✨ New Features - Modern UI Redesign

### 🎨 Dual Theme System
- **Light/Dark Mode**: Full theme support with toggle functionality in header
- **Persistent Preferences**: Theme choice maintained across sessions
- **Smooth Transitions**: Elegant animations when switching themes

### 🖥️ Modern Dashboards
- **Admin Dashboard**: Real-time statistics, quick actions, activity feed, data tables
- **Faculty Dashboard**: Course management, grade tracking, assignment monitoring
- **Student Dashboard**: Course enrollment, academic progress, schedules

### 🎯 UI Components
- **Glass Morphism Cards**: Modern translucent design with blur effects
- **Interactive Elements**: Hover effects, transitions, micro-interactions
- **Responsive Sidebar**: Collapsible navigation with role-based menu items
- **Data Tables**: Sortable, filterable tables with pagination
- **Stat Cards**: Visual metrics with trend indicators
- **Activity Feed**: Real-time updates and notifications

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/College-Erp.git
   cd College-Erp
   ```

2. **Setup Environment Variables**
   - Create a `.env` file in the server folder
   - Copy the content from `.env.example` to the newly created `.env` file
   - Change the `MONGODB_URI` to your MongoDB Atlas URI or local database

3. **Install Dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

4. **Run the Application**
   ```bash
   # Start the server (from server directory)
   npm start

   # Start the client (from client directory) - in a new terminal
   npm start
   ```

5. **Access the Application**
   - Open browser and go to `localhost:3000`
   - Default admin credentials:
     - **Username**: `ADMDUMMY`
     - **Password**: `123`

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, Redux Toolkit, React Router v6 |
| **Styling** | Tailwind CSS, Custom CSS Variables |
| **Icons** | Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Auth** | JWT (JSON Web Tokens) |
| **Build Tool** | Create React App |

## 📁 Project Structure

```
College-Erp/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # Reusable UI Components
│   │   │   │   ├── Common/   # Button, Card, Input
│   │   │   │   ├── Layout/   # Header, Sidebar, Layout
│   │   │   │   ├── Dashboard/# StatCard, QuickActions, ActivityFeed
│   │   │   │   └── Tables/   # DataTable
│   │   │   ├── login/        # Login Components
│   │   │   └── ...           # Other components
│   │   ├── pages/            # Page Components
│   │   ├── redux/            # Redux Store & Actions
│   │   └── styles/           # Tailwind Config, CSS
│   └── public/               # Static Assets
├── server/                     # Express Backend
│   ├── controllers/            # API Controllers
│   ├── models/                # MongoDB Models
│   ├── routes/                # API Routes
│   └── middleware/            # Auth Middleware
└── README.md
```

## 🎯 Core Features

### Admin Portal
- ✅ Complete user management (Students, Faculty, Departments)
- ✅ Real-time statistics with trend indicators
- ✅ Quick action buttons for common tasks
- ✅ Activity feed with system updates
- ✅ Data tables with sorting, filtering, pagination
- ✅ Department overview with student distribution
- ✅ Notice creation and management

### Faculty Portal
- ✅ Course management and subject allocation
- ✅ Student grade tracking and management
- ✅ Assignment creation and submission monitoring
- ✅ Attendance marking system
- ✅ Personal timetable and schedule

### Student Portal
- ✅ Course enrollment and tracking
- ✅ Academic progress visualization
- ✅ Grade viewing and transcript generation
- ✅ Assignment submission portal
- ✅ Class schedules and timetables
- ✅ Attendance viewing

### Authentication & Security
- ✅ JWT-based secure authentication
- ✅ Role-based access control (RBAC)
- ✅ Password encryption with bcrypt
- ✅ Protected routes and API endpoints

## 🎨 UI/UX Highlights

- **Modern Design**: Glass-morphism effects, gradients, shadows
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: WCAG compliant color contrast
- **Smooth Animations**: Transitions, hover effects, loading states
- **Theme Toggle**: Instant light/dark mode switching
- **Consistent Design System**: Reusable components across the app

## 🚀 Future Enhancements

- [ ] Advanced analytics and reporting
- [ ] Fee management module
- [ ] Library management integration
- [ ] Examination scheduling system
- [ ] Mobile application (React Native)
- [ ] Real-time chat between users
- [ ] Email notification system

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Authors

- **Developer** - Initial work and UI redesign

---

**Built with ❤️ for educational institutions**

## 📸 Preview

### Admin Dashboard
https://user-images.githubusercontent.com/90241373/156794210-af4db587-1aba-4289-9196-07f2e179d9bb.mp4

<br>

### Faculty Dashboard
https://user-images.githubusercontent.com/90241373/156794428-1a73579c-8116-45dd-bee4-140f3b6de2c8.mp4

<br>

### Student Dashboard
https://user-images.githubusercontent.com/90241373/156794474-2ba1d10e-30c8-4ce7-881b-520d7ab6aec6.mp4
=======
# college-erp
College ERP - Modern Educational Management System A comprehensive College ERP (Enterprise Resource Planning) system built with the MERN stack, featuring a modern dual-themed UI for managing academic operations efficiently.
>>>>>>> 2f09030cc42c5b696f79427d21f00b5fd67e07e5
