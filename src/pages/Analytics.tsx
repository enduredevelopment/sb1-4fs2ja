import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const taskData = [
  { name: 'Jan', completed: 45, pending: 20 },
  { name: 'Feb', completed: 55, pending: 15 },
  { name: 'Mar', completed: 40, pending: 25 },
  { name: 'Apr', completed: 60, pending: 18 },
  { name: 'May', completed: 50, pending: 22 },
  { name: 'Jun', completed: 65, pending: 12 },
];

const departmentData = [
  { name: 'Engineering', value: 40 },
  { name: 'Design', value: 25 },
  { name: 'Product', value: 20 },
  { name: 'Marketing', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Task Completion Trends */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Task Completion Trends
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#4F46E5" name="Completed Tasks" />
                <Bar dataKey="pending" fill="#EF4444" name="Pending Tasks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Department Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Productivity Metrics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Productivity Metrics
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#4F46E5"
                  name="Completed Tasks"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Key Performance Indicators
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-indigo-600 font-medium">Task Completion Rate</p>
              <p className="text-2xl font-semibold text-indigo-900">85%</p>
              <p className="text-sm text-indigo-500">+5% from last month</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Team Efficiency</p>
              <p className="text-2xl font-semibold text-green-900">92%</p>
              <p className="text-sm text-green-500">+3% from last month</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-600 font-medium">Active Projects</p>
              <p className="text-2xl font-semibold text-yellow-900">24</p>
              <p className="text-sm text-yellow-500">2 new this month</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-600 font-medium">Overdue Tasks</p>
              <p className="text-2xl font-semibold text-red-900">3</p>
              <p className="text-sm text-red-500">-2 from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;