import { useState, useEffect } from 'react';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 模拟数据
        const mockProjects = [
          {
            id: 1,
            name: '企业网站重构',
            client: 'ABC科技有限公司',
            status: 'active',
            dueDate: '2025-05-15',
            budget: 12000,
            hours: 23.5,
            tasks: { completed: 8, total: 15 },
            description: '为客户重新设计并开发企业官网，包括响应式布局设计、内容管理系统集成、性能优化。'
          },
          {
            id: 2,
            name: 'App界面设计',
            client: '健康生活应用',
            status: 'active',
            dueDate: '2025-04-30',
            budget: 8000,
            hours: 12,
            tasks: { completed: 3, total: 8 },
            description: '设计一款健康生活类App的用户界面，包含饮食记录、运动追踪等核心功能的界面设计。'
          },
          {
            id: 3,
            name: 'Logo设计包',
            client: '新创咖啡店',
            status: 'completed',
            dueDate: '2025-03-20',
            budget: 3200,
            hours: 8.5,
            tasks: { completed: 6, total: 6 },
            description: '为新开业的咖啡店设计品牌Logo，包括 Logo 主体设计、名片、菜单等延展设计。'
          }
        ];
        
        setProjects(mockProjects);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  const addProject = (project) => {
    // 在实际应用中，这里会调用API创建项目
    const newProject = {
      ...project,
      id: Date.now(),
      tasks: { completed: 0, total: 0 },
      hours: 0
    };
    
    setProjects([...projects, newProject]);
    return newProject;
  };
  
  const updateProject = (id, updates) => {
    // 在实际应用中，这里会调用API更新项目
    setProjects(projects.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };
  
  const deleteProject = (id) => {
    // 在实际应用中，这里会调用API删除项目
    setProjects(projects.filter(project => project.id !== id));
  };
  
  const getProject = (id) => {
    return projects.find(project => project.id === parseInt(id));
  };
  
  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    getProject
  };
};