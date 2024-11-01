import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

// Lazy load pages
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Tasks = React.lazy(() => import('./pages/Tasks'));
const Team = React.lazy(() => import('./pages/Team'));
const Calendar = React.lazy(() => import('./pages/Calendar'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const Settings = React.lazy(() => import('./pages/Settings'));

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </React.Suspense>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/tasks" element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              } />
              <Route path="/team" element={
                <PrivateRoute>
                  <Team />
                </PrivateRoute>
              } />
              <Route path="/calendar" element={
                <PrivateRoute>
                  <Calendar />
                </PrivateRoute>
              } />
              <Route path="/analytics" element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              } />
              <Route path="/notifications" element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              } />
              <Route path="/settings" element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } />
            </Routes>
          </React.Suspense>
        </main>
      </div>
    </div>
  );
}

export default App;