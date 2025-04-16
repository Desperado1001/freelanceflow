import React, { useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { AppContext } from '../../contexts/AppContext';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const { sidebar, setSidebar, notifications, removeNotification } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <div className={`bg-blue-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebar.open ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <div className="flex items-center space-x-2 px-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-2xl font-extrabold">FreeLanceFlow</span>
        </div>

        <nav>
          <Link to="/" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            仪表盘
          </Link>
          <Link to="/projects" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname.startsWith('/projects') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            项目管理
          </Link>
          <Link to="/tasks" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/tasks' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            任务列表
          </Link>
          <Link to="/time-tracker" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/time-tracker' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            时间跟踪
          </Link>
          <Link to="/timesheet" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname === '/timesheet' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            工时表
          </Link>
          <Link to="/invoices" className={`block py-2.5 px-4 rounded transition duration-200 ${location.pathname.startsWith('/invoices') ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
            发票管理
          </Link>
        </nav>

        <div className="absolute bottom-0 p-4 w-full">
          <button onClick={handleLogout} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200">
            退出登录
          </button>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <header className="bg-white shadow">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebar({ ...sidebar, open: !sidebar.open })}
              className="lg:hidden text-gray-600 focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="text-gray-800 font-bold text-xl">
              {location.pathname === '/' && '仪表盘'}
              {location.pathname.startsWith('/projects') && '项目管理'}
              {location.pathname === '/tasks' && '任务列表'}
              {location.pathname === '/time-tracker' && '时间跟踪'}
              {location.pathname === '/timesheet' && '工时表'}
              {location.pathname.startsWith('/invoices') && '发票管理'}
            </div>

            <div className="flex items-center">
              <span className="mr-2 text-gray-700">{user?.name || '用户'}</span>
              <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                <span className="text-blue-700 font-bold">
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* 通知区域 */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-2 rounded shadow-lg flex justify-between items-center max-w-xs animate-slide-in
                ${notification.type === 'success' ? 'bg-green-500 text-white' : 
                  notification.type === 'error' ? 'bg-red-500 text-white' : 
                  'bg-blue-500 text-white'}`}
            >
              <p>{notification.message}</p>
              <button 
                onClick={() => removeNotification(notification.id)}
                className="ml-2 text-white"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        {/* 主内容区域 */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;