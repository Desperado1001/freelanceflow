import React, { useState, useEffect } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { useClients } from '../../hooks/useClients';

const Reports = () => {
  const { projects, loading: projectsLoading } = useProjects();
  const { clients, loading: clientsLoading } = useClients();
  
  const [selectedReport, setSelectedReport] = useState('revenue');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (projectsLoading || clientsLoading) {
      setLoading(true);
      return;
    }
    
    const generateReportData = () => {
      switch (selectedReport) {
        case 'revenue':
          return generateRevenueReport();
        case 'clientProjects':
          return generateClientProjectsReport();
        case 'projectStatus':
          return generateProjectStatusReport();
        default:
          return null;
      }
    };
    
    setReportData(generateReportData());
    setLoading(false);
  }, [selectedReport, projects, clients, projectsLoading, clientsLoading]);
  
  // 收入报表 - 按月分组
  const generateRevenueReport = () => {
    const monthlyRevenue = {};
    
    // 按月分组项目预算
    projects.forEach(project => {
      const dueDate = new Date(project.dueDate);
      const monthKey = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyRevenue[monthKey]) {
        monthlyRevenue[monthKey] = 0;
      }
      
      monthlyRevenue[monthKey] += project.budget;
    });
    
    // 转换为数组并排序
    const data = Object.entries(monthlyRevenue)
      .map(([month, amount]) => ({ month, amount }))
      .sort((a, b) => a.month.localeCompare(b.month));
    
    // 计算总收入
    const totalRevenue = data.reduce((sum, item) => sum + item.amount, 0);
    
    return {
      data,
      total: totalRevenue
    };
  };
  
  // 客户项目报表
  const generateClientProjectsReport = () => {
    const clientProjectsData = clients.map(client => {
      const clientProjects = projects.filter(project => project.client === client.id);
      const totalBudget = clientProjects.reduce((sum, project) => sum + project.budget, 0);
      const completedProjects = clientProjects.filter(project => project.status === 'completed').length;
      
      return {
        id: client.id,
        name: client.name,
        totalProjects: clientProjects.length,
        completedProjects,
        totalBudget
      };
    });
    
    return clientProjectsData.sort((a, b) => b.totalBudget - a.totalBudget);
  };
  
  // 项目状态报表
  const generateProjectStatusReport = () => {
    const statusCounts = {
      active: 0,
      completed: 0,
      pending: 0
    };
    
    projects.forEach(project => {
      if (statusCounts.hasOwnProperty(project.status)) {
        statusCounts[project.status]++;
      }
    });
    
    const data = [
      { name: '进行中', value: statusCounts.active, color: 'bg-green-500' },
      { name: '已完成', value: statusCounts.completed, color: 'bg-blue-500' },
      { name: '待处理', value: statusCounts.pending, color: 'bg-yellow-500' }
    ];
    
    const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
    
    return {
      data,
      total
    };
  };
  
  // 渲染收入报表
  const renderRevenueReport = () => {
    if (!reportData || reportData.data.length === 0) {
      return <p className="text-gray-500 dark:text-gray-400 text-center py-8">暂无收入数据</p>;
    }
    
    const maxAmount = Math.max(...reportData.data.map(item => item.amount));
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">月度收入分布</h3>
          <p className="text-gray-700 dark:text-gray-300">总收入: ¥{reportData.total.toLocaleString()}</p>
        </div>
        
        <div className="relative mt-6">
          <div className="flex items-end space-x-2 h-64">
            {reportData.data.map((item, index) => {
              const height = (item.amount / maxAmount) * 100;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-500 dark:bg-blue-600 rounded-t transition-all duration-500 ease-in-out"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 -rotate-45 origin-top-left">
                    {item.month}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute left-0 top-0 bottom-0 border-r border-gray-200 dark:border-gray-700"></div>
        </div>
        
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">月份</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">收入</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
              {reportData.data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{item.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-right">¥{item.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // 渲染客户项目报表
  const renderClientProjectsReport = () => {
    if (!reportData || reportData.length === 0) {
      return <p className="text-gray-500 dark:text-gray-400 text-center py-8">暂无客户数据</p>;
    }
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">客户项目分析</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">客户名称</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">项目数量</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">完成数量</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">完成率</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">总预算</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
              {reportData.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{client.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">{client.totalProjects}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">{client.completedProjects}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">
                    {client.totalProjects > 0 ? Math.round((client.completedProjects / client.totalProjects) * 100) : 0}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 text-right">
                    ¥{client.totalBudget.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // 渲染项目状态报表
  const renderProjectStatusReport = () => {
    if (!reportData || reportData.data.length === 0 || reportData.total === 0) {
      return <p className="text-gray-500 dark:text-gray-400 text-center py-8">暂无项目数据</p>;
    }
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">项目状态分布</h3>
        
        <div className="flex justify-center">
          <div className="w-64 h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {reportData.data.map((item, index) => {
                if (item.value === 0) return null;
                
                const percentage = Math.round((item.value / reportData.total) * 100);
                
                // Simple way to generate pie chart sections
                let previousEndPercentage = 0;
                for (let i = 0; i < index; i++) {
                  if (reportData.data[i].value > 0) {
                    previousEndPercentage += (reportData.data[i].value / reportData.total) * 100;
                  }
                }
                
                const startAngle = (previousEndPercentage / 100) * 360;
                const endAngle = ((previousEndPercentage + percentage) / 100) * 360;
                
                // Convert to radians for calculations
                const startRad = (startAngle - 90) * Math.PI / 180;
                const endRad = (endAngle - 90) * Math.PI / 180;
                
                // Calculate path
                const radius = 50;
                const center = 50;
                
                const x1 = center + radius * Math.cos(startRad);
                const y1 = center + radius * Math.sin(startRad);
                const x2 = center + radius * Math.cos(endRad);
                const y2 = center + radius * Math.sin(endRad);
                
                // Create path
                const largeArcFlag = percentage > 50 ? 1 : 0;
                const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                
                // Calculate text position
                const midAngle = (startAngle + endAngle) / 2 * Math.PI / 180;
                const textRadius = radius * 0.7;
                const textX = center + textRadius * Math.cos(midAngle - Math.PI/2);
                const textY = center + textRadius * Math.sin(midAngle - Math.PI/2);
                
                return (
                  <g key={index}>
                    <path d={path} className={`${item.color} dark:opacity-80`}></path>
                    {percentage >= 10 && (
                      <text
                        x={textX}
                        y={textY}
                        className="fill-white text-xs font-bold"
                        dominantBaseline="middle"
                        textAnchor="middle"
                      >
                        {percentage}%
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          {reportData.data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-4 h-4 ${item.color} dark:opacity-80 rounded-sm mr-2`}></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderReport = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div>
      );
    }
    
    switch (selectedReport) {
      case 'revenue':
        return renderRevenueReport();
      case 'clientProjects':
        return renderClientProjectsReport();
      case 'projectStatus':
        return renderProjectStatusReport();
      default:
        return <p>请选择一个报表</p>;
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">数据报表</h1>
      
      <div className="bg-white dark:bg-dark-card rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap space-x-2">
            <button
              onClick={() => setSelectedReport('revenue')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedReport === 'revenue' ? 
                'bg-blue-600 dark:bg-blue-700 text-white' : 
                'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              收入分析
            </button>
            <button
              onClick={() => setSelectedReport('clientProjects')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedReport === 'clientProjects' ? 
                'bg-blue-600 dark:bg-blue-700 text-white' : 
                'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              客户项目
            </button>
            <button
              onClick={() => setSelectedReport('projectStatus')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedReport === 'projectStatus' ? 
                'bg-blue-600 dark:bg-blue-700 text-white' : 
                'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              项目状态
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {renderReport()}
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 shadow-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">提示</h3>
            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
              <p>这是一个基本的数据报表功能。在实际应用中，您可以导出这些数据为CSV或PDF格式，并可以设置更多自定义筛选条件。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;