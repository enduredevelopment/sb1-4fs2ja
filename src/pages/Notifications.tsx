import React from 'react';
import { Bell, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'New Task Assignment',
    message: 'You have been assigned to the project "Website Redesign"',
    type: 'task',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 2,
    title: 'Meeting Reminder',
    message: 'Team meeting starts in 30 minutes',
    type: 'reminder',
    time: '2 hours ago',
    read: true,
  },
  {
    id: 3,
    title: 'Task Completed',
    message: 'John Smith completed the task "Database Migration"',
    type: 'completion',
    time: '3 hours ago',
    read: false,
  },
  {
    id: 4,
    title: 'Deadline Approaching',
    message: 'Project deadline is approaching in 2 days',
    type: 'deadline',
    time: '5 hours ago',
    read: true,
  },
];

const Notifications = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Mark All as Read
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 hover:bg-gray-50 ${
                !notification.read ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    notification.type === 'task'
                      ? 'bg-blue-100'
                      : notification.type === 'reminder'
                      ? 'bg-yellow-100'
                      : notification.type === 'completion'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}
                >
                  {notification.type === 'task' && (
                    <Bell className="h-5 w-5 text-blue-600" />
                  )}
                  {notification.type === 'reminder' && (
                    <Clock className="h-5 w-5 text-yellow-600" />
                  )}
                  {notification.type === 'completion' && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {notification.type === 'deadline' && (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500">{notification.message}</p>
                </div>
                <div className="flex-shrink-0 flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {notification.time}
                  </span>
                  {!notification.read && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      New
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;