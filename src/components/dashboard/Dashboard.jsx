import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 模拟数据
const getDashboardData = () => {
  return {
    stats: {
      activeProjects: 5,
      completedProjects: 12,
      totalEarnings: 25600,
      pendingInvoices: 3
    },
    recentProjects: [
      { id: 1, name: '网站重新设计', client: '科技有限公司', deadline: '2025-05-01', status: 'active' },
      { id: 2, name: 'APP开发', client: '创新科技', deadline: '2025-06-15', status: 'active' },
      { id: 3, name: '品牌策略', client: '新兴企业', deadline: '2025-04-20', status: 'active' }
    ],
    upcomingTasks: [
      { id: 1, name: '首页UI设计', projectId: 1, dueDate: '2025-04-18', priority: 'high' },
      { id: 2, name: '功能需求文档', projectId: 2, dueDate: '2025-04-20', priority: 'medium' },
      { id: 3, name: '品牌调研', projectId: 3, dueDate: '2025-04-17', priority: 'high' },
      { id: 4, name: '客户会议', projectId: 1, dueDate: '2025-04-19', priority: 'low' }
    ],
    timeLog: [
      { date: '2025-04-15', hours: 6.5, projectId: 1, project: '网站重新设计' },
      { date: '2025-04-14', hours: 7, projectId: 2, project: 'APP开发' },
      { date: '2025-04-13', hours: 5, projectId: 3, project: '品牌策略' },
      { date: '2025-04-12', hours: 8, projectId: 1, project: '网站重新设计' },
      { date: '2025-04-11', hours: 6, projectId: 2, project: 'APP开发' }
    ]
  };
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 模拟API调用
    const fetchData = async () => {
      try {
        // 在实际应用中，这里会从API获取数据
        const data = getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('获取仪表盘数据失败', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">进行中的项目</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.stats.activeProjects}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">已完成项目</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.stats.completedProjects}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">总收入</p>
              <h3 className="text-2xl font-bold text-gray-800">¥{dashboardData.stats.totalEarnings.toLocaleString()}</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">未付款发票</p>
              <h3 className="text-2xl font-bold text-gray-800">{dashboardData.stats.pendingInvoices}</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* 最近项目和待办任务网格 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近项目 */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">活跃项目</h2>
            <Link to="/projects" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              查看全部
            </Link>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {dashboardData.recentProjects.map(project => (
                <div key={project.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <Link to={`/projects/${project.id}`} className="font-medium text-gray-800 hover:text-blue-600">
                      {project.name}
                    </Link>
                    <p className="text-sm text-gray-500">客户: {project.client}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">截止日期</span>
                    <p className="text-sm font-medium text-gray-800">{project.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 待办任务 */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">即将到期的任务</h2>
            <Link to="/tasks" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              查看全部
            </Link>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {dashboardData.upcomingTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      task.priority === 'high' ? 'bg-red-500' : 
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-800">{task.name}</p>
                      <p className="text-sm text-gray-500">项目ID: {task.projectId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">截止日期</span>
                    <p className="text-sm font-medium text-gray-800">{task.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 最近工时记录 */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">最近工时记录</h2>
          <Link to="/timesheet" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            查看全部
          </Link>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日期
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    项目
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    工时
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.timeLog.map((log, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {log.project}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.hours} 小时
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;