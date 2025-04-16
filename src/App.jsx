import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout
import Layout from './components/layout/Layout';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Main Components
import Dashboard from './components/dashboard/Dashboard';
import ProjectList from './components/projects/ProjectList';
import ProjectDetail from './components/projects/ProjectDetail';
import NewProject from './components/projects/NewProject';
import TaskList from './components/tasks/TaskList';
import TimeTracker from './components/time/TimeTracker';
import TimeSheet from './components/time/TimeSheet';
import InvoiceList from './components/invoices/InvoiceList';
import InvoiceDetail from './components/invoices/InvoiceDetail';
import InvoiceForm from './components/invoices/InvoiceForm';
import ClientList from './components/clients/ClientList';
import ClientDetail from './components/clients/ClientDetail';
import NewClient from './components/clients/NewClient';
import Reports from './components/reports/Reports';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Simple auth check
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial loading (check auth, load settings, etc)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-dark-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router basename="/">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<ProjectList />} />
                <Route path="projects/new" element={<NewProject />} />
                <Route path="projects/:id" element={<ProjectDetail />} />
                <Route path="tasks" element={<TaskList />} />
                <Route path="clients" element={<ClientList />} />
                <Route path="clients/new" element={<NewClient />} />
                <Route path="clients/:id" element={<ClientDetail />} />
                <Route path="time-tracker" element={<TimeTracker />} />
                <Route path="timesheet" element={<TimeSheet />} />
                <Route path="invoices" element={<InvoiceList />} />
                <Route path="invoices/new" element={<InvoiceForm />} />
                <Route path="invoices/:id" element={<InvoiceDetail />} />
                <Route path="reports" element={<Reports />} />
              </Route>
            </Routes>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;