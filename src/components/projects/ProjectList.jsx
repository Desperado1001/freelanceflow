import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

// 模拟数据
const getProjects = () => {
  return [
    { 
      id: 1, 
      name: '网站重新设计', 
      client: '科技有限公司', 
      startDate: '2025-03-01', 
      deadline: '2025-05-01', 
      status: 'active',
      budget: 15000,
      description: '为客户重新设计公司网站，包括响应式布局和现代化UI设计。'
    },
    { 
      id: 2, 
      name: 'APP开发', 
      client: '创新科技', 
      startDate: '2025-03-15', 
      deadline: '2025-06-15', 
      status: 'active',
      budget: 50000,
      description: '开发一款iOS和Android双平台应用程序，主要功能包括用户管理、数据分析和通知系统。'
    },
    { 
      id: 3, 
      name: '品牌策略', 
      client: '新兴企业', 
      startDate: '2025-04-01', 
      deadline: '2025-04-20', 
      status: 'active',
      budget: 10000,
      description: '为新成立的企业制定品牌策略，包括品牌定位、视觉识别和营销方案。'
    },
    { 
      id: 4, 
      name: 'SEO优化', 
      client: '在线商城', 
      startDate: '2025-02-01', 
      deadline: '2025-04-30', 
      status: 'active',
      budget: 8000,
      description: '进行全面的SEO审核并实施优化策略，提高网站的搜索引擎排名和流量。'
    },
    { 
      id: 5, 
      name: '内容营销', 
      client: '教育机构', 
      startDate: '2025-01-15', 
      deadline: '2025-04-15', 
      status: 'completed',
      budget: 12000,
      description: '开发和执行内容营销计划，创建高质量博客文章、案例研究和社交媒体内容。'
    },
    { 
      id: 6, 
      name: '商业策划', 
      client: '创业团队', 
      startDate: '2025-02-15', 
      deadline: '2025-03-31', 
      status: 'completed',
      budget: 20000,
      description: '制定详细的商业计划，包括市场分析、财务预测和运营策略。'
    },
  ];
};

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('deadline'); // 'name', 'client', 'deadline'
  const [searchTerm, setSearchTerm] = useState('');
  
  const { addNotification } = useContext(AppContext);
  
  useEffect(() => {
    // 模拟API调用
    const fetchProjects = async () => {
      try {
        // 在实际应用中，这里会从API获取数据
        const data = getProjects();
        setProjects(data);
      } catch (error) {
        console.error('获取项目列表失败', error);
        addNotification('获取项目列表失败', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [addNotification]);
  
  const filteredProjects = projects
    .filter(project => {
      // 状态过滤
      if (filter === 'active' && project.status !== 'active') return false;
      if (filter === 'completed' && project.status !== 'completed') return false;
      
      // 搜索过滤
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          project.name.toLowerCase().includes(searchLower) ||
          project.client.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // 排序
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'client') {
        return a.client.localeCompare(b.client);
      } else if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return 0;
    });
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">项目管理</h1>
        <Link
          to="/projects/new"
          className="mt-4 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-flex items-center transition duration-150"
        >
          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          创建新项目
        </Link>
      </div>
      
      {/* 筛选和搜索工具栏 */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <div>
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <select
              id="filter"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">全部</option>
              <option value="active">进行中</option>
              <option value="completed">已完成</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">排序方式</label>
            <select
              id="sortBy"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="deadline">截止日期</option>
              <option value="name">项目名称</option>
              <option value="client">客户名称</option>
            </select>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="搜索项目名称、客户或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* 项目列表 */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">没有找到匹配的项目</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-800 truncate">{project.name}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status === 'active' ? '进行中' : '已完成'}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">客户: {project.client}</p>
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-500 line-clamp-2 h-10">{project.description}</p>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">开始日期</p>
                    <p className="text-sm font-medium text-gray-800">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">截止日期</p>
                    <p className="text-sm font-medium text-gray-800">{project.deadline}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs text-gray-500">预算</p>
                  <p className="text-sm font-medium text-gray-800">¥{project.budget.toLocaleString()}</p>
                </div>
                
                <Link
                  to={`/projects/${project.id}`}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-flex justify-center items-center transition duration-150"
                >
                  查看详情
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;