export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  department: string;
  avatar?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  dueDate: Date;
  attachments?: string[];
  comments: Comment[];
  createdBy: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'task' | 'mention' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface Department {
  id: string;
  name: string;
  managerId: string;
  memberCount: number;
}