import React, { useState } from 'react';
import { Users, Mail, Phone, MapPin } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Senior Developer',
    department: 'Engineering',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    department: 'Product',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'active',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'UI/UX Designer',
    department: 'Design',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Los Angeles, CA',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'away',
  },
];

const Team = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const filteredMembers = teamMembers.filter(
    (member) =>
      (selectedDepartment === 'all' || member.department === selectedDepartment) &&
      (member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Team Members</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Users className="h-5 w-5 mr-2" />
          Add Member
        </button>
      </div>

      <div className="flex space-x-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="all">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Product">Product</option>
          <option value="Design">Design</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
          >
            <div className="px-4 py-5 sm:px-6">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src={member.avatar}
                  alt={member.name}
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <div className="ml-auto">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                <div className="flex items-center">
                  <dt className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    Department
                  </dt>
                  <dd className="ml-auto text-sm text-gray-900">{member.department}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </dt>
                  <dd className="ml-auto text-sm text-gray-900">
                    <a href={`mailto:${member.email}`} className="text-indigo-600 hover:text-indigo-500">
                      {member.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center">
                  <dt className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </dt>
                  <dd className="ml-auto text-sm text-gray-900">{member.phone}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </dt>
                  <dd className="ml-auto text-sm text-gray-900">{member.location}</dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;