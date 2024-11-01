import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
  const { user } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex-1 flex items-center">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>

            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}`}
                alt={user?.username}
              />
              <span className="ml-3 text-sm font-medium text-gray-700">{user?.username}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};