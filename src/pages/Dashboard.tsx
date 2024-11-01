import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Users, CheckSquare, Clock, AlertTriangle } from 'lucide-react';

const data = [
  { name: 'Mon', tasks: 4 },
  { name: 'Tue', tasks: 3 },
  { name: 'Wed', tasks: 7 },
  { name: 'Thu', tasks: 5 },
  { name: 'Fri', tasks: 6 },
  { name: 'Sat', tasks: 2 },
  { name: 'Sun', tasks: 1 },
];

const stats = [
  { name: 'Team Members', value: '12', icon: Users, color: 'bg-blue-500' },
  { name: 'Total Tasks', value: '28', icon: CheckSquare, color: 'bg-green-500' },
  { name: 'Pending Tasks', value: '7', icon: Clock, color: 'bg-yellow-500' },
  { name: 'Overdue Tasks', value: '3', icon: AlertTriangle, color: 'bg-red-500' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${item.color}`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {item.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Task Completion Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activities
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {[1, 2, 3, 4].map((activity, activityIdx) => (
                <li key={activity}>
                  <div className="relative pb-8">
                    {activityIdx !== 3 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <Users className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            New task assigned to{' '}
                            <a href="#" className="font-medium text-gray-900">
                              Team A
                            </a>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime="2024-03-13">1h ago</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;