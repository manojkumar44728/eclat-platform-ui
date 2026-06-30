import { createBrowserRouter, Navigate } from 'react-router-dom';

import ProtectedRoute from '@/app/routes/ProtectedRoute';
import PublicRoute from '@/app/routes/PublicRoute';
import LoginPage from '@/features/auth/LoginPage';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },

  // Public Routes
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/users',
            element: <UsersPage />,
          },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
