import { Tooltip } from 'antd';
import clsx from 'clsx';
import {
  LayoutDashboard,
  Settings,
  User,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const menuItems = [
  {
    id: 1,
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 2,
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
  {
    id: 3,
    label: 'Profile',
    path: '/profile',
    icon: User,
  },
];

const Sidebar = ({ isSidebarOpen }: SidebarProps) => {
  return (
    <aside
      className={clsx(
        'overflow-hidden border-r border-gray-200 bg-white transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'w-60' : 'w-16'
      )}
    >
      <nav className="py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map(({ id, label, path, icon: Icon }) => {
            const navItem = (
              <NavLink
                to={path}
                className={({ isActive }) =>
                  clsx(
                    'flex h-11 items-center rounded-md px-3 transition-colors duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                  )
                }
              >
                {/* Icon */}
                <div className="flex h-5 w-5 items-center justify-center flex-shrink-0">
                  <Icon size={20} />
                </div>

                {/* Label */}
                <span
                  className={clsx(
                    'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
                    isSidebarOpen
                      ? 'ml-3 max-w-[180px] opacity-100'
                      : 'ml-0 max-w-0 opacity-0'
                  )}
                >
                  {label}
                </span>
              </NavLink>
            );

            return (
              <li key={id}>
                {isSidebarOpen ? (
                  navItem
                ) : (
                  <Tooltip title={label} placement="right">
                    {navItem}
                  </Tooltip>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;