import { create } from 'zustand';
import Parse from 'parse';
import { Notification } from '../types';

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const query = new Parse.Query('Notification');
      const results = await query.find();
      const notifications = results.map((notification) => ({
        id: notification.id,
        type: notification.get('type'),
        title: notification.get('title'),
        message: notification.get('message'),
        read: notification.get('read'),
        createdAt: notification.get('createdAt'),
      }));
      set({ notifications, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  markAsRead: async (id: string) => {
    try {
      const query = new Parse.Query('Notification');
      const notification = await query.get(id);
      notification.set('read', true);
      await notification.save();
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  markAllAsRead: async () => {
    try {
      const query = new Parse.Query('Notification');
      const unreadNotifications = await query.equalTo('read', false).find();
      await Parse.Object.saveAll(
        unreadNotifications.map((notification) => {
          notification.set('read', true);
          return notification;
        })
      );
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  deleteNotification: async (id: string) => {
    try {
      const query = new Parse.Query('Notification');
      const notification = await query.get(id);
      await notification.destroy();
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));