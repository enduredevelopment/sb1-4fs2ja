import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Settings,
  BarChart2,
  Calendar,
  Bell,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const { user, logout } = useAuthStore();

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Tasks', icon: CheckSquare, href: '/tasks' },
    { name: 'Team', icon: Users, href: '/team' },
    { name: 'Calendar', icon: Calendar, href: '/calendar' },
    { name: 'Analytics', icon: BarChart2, href: '/analytics' },
    { name: 'Notifications', icon: Bell, href: '/notifications' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="flex h-screen flex-col justify-between bg-gray-900 w-64 p-4">
      <div>
        <div className="flex items-center space-x-2 px-4 py-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <span className="text-white font-bold">SM</span>
          </div>
          <span className="text-white font-semibold text-lg">StaffMaster</span>
        </div>
        
        <nav className="mt-8 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-indigo-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-800 pt-4">
        <div className="flex items-center px-4 py-2">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}`}
            alt={user?.username}
            className="h-8 w-8 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{user?.username}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="mt-2 flex w-full items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );
};