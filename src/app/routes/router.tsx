import { createBrowserRouter, Navigate } from 'react-router-dom';

import ProtectedRoute from '@/app/routes/ProtectedRoute';
// import PublicRoute from '@/app/routes/PublicRoute';
import AppLayout from '@/components/layout/AppLayout';
import LoginPage from '@/features/auth/LoginPage';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },

  // Public Routes
  {
    path: '/login',
    element: <LoginPage />,
  },

  // App Routes
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      // {
      //   index: true,
      //   element: <Navigate to="/dashboard" replace />,
      // },
    ],
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      // {
      //   element: <DashboardLayout />,
      //   children: [
      //     {
      //       path: '/dashboard',
      //       element: <DashboardPage />,
      //     },
      //     {
      //       path: '/users',
      //       element: <UsersPage />,
      //     },
      //   ],
      // },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
