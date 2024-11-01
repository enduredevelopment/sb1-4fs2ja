import { create } from 'zustand';
import Parse from 'parse';
import { Task } from '../types';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const query = new Parse.Query('Task');
      const results = await query.find();
      const tasks = results.map((task) => ({
        id: task.id,
        title: task.get('title'),
        description: task.get('description'),
        assignedTo: task.get('assignedTo'),
        priority: task.get('priority'),
        status: task.get('status'),
        dueDate: task.get('dueDate'),
        attachments: task.get('attachments'),
        comments: task.get('comments'),
        createdBy: task.get('createdBy'),
        createdAt: task.get('createdAt'),
      }));
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createTask: async (taskData) => {
    set({ isLoading: true });
    try {
      const Task = Parse.Object.extend('Task');
      const task = new Task();
      Object.entries(taskData).forEach(([key, value]) => {
        task.set(key, value);
      });
      await task.save();
      set((state) => ({
        tasks: [...state.tasks, { ...taskData, id: task.id, createdAt: task.createdAt }],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateTask: async (id, updates) => {
    set({ isLoading: true });
    try {
      const query = new Parse.Query('Task');
      const task = await query.get(id);
      Object.entries(updates).forEach(([key, value]) => {
        task.set(key, value);
      });
      await task.save();
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true });
    try {
      const query = new Parse.Query('Task');
      const task = await query.get(id);
      await task.destroy();
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));