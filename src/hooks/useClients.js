import { useState, useEffect } from 'react';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        // 检查本地存储中是否有客户数据
        const savedClients = localStorage.getItem('clients');
        
        if (savedClients) {
          setClients(JSON.parse(savedClients));
          setLoading(false);
          return;
        }
        
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 模拟数据
        const mockClients = [
          {
            id: 1,
            name: 'ABC科技有限公司',
            contactPerson: '张经理',
            email: 'zhang@abctech.com',
            phone: '13812345678',
            address: '上海市浦东新区科技园区88号',
            projects: [1],
            invoices: [1, 3],
            notes: '大型科技企业客户，对响应速度要求高'
          },
          {
            id: 2,
            name: '健康生活应用',
            contactPerson: '李总监',
            email: 'li@healthapp.com',
            phone: '13987654321',
            address: '北京市海淀区创业园12号楼',
            projects: [2],
            invoices: [2],
            notes: '创业公司，预算有限但需求明确'
          },
          {
            id: 3,
            name: '新创咖啡店',
            contactPerson: '王老板',
            email: 'wang@newcafe.com',
            phone: '13598765432',
            address: '深圳市南山区海岸城附近',
            projects: [3],
            invoices: [],
            notes: '小型企业，注重品牌形象'
          }
        ];
        
        setClients(mockClients);
        // 保存到本地存储
        localStorage.setItem('clients', JSON.stringify(mockClients));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClients();
  }, []);
  
  const addClient = (client) => {
    // 在实际应用中，这里会调用API创建客户
    const newClient = {
      ...client,
      id: Date.now(),
      projects: [],
      invoices: []
    };
    
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    
    // 更新本地存储
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    
    return newClient;
  };
  
  const updateClient = (id, updates) => {
    // 在实际应用中，这里会调用API更新客户
    const updatedClients = clients.map(client => 
      client.id === id ? { ...client, ...updates } : client
    );
    
    setClients(updatedClients);
    
    // 更新本地存储
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };
  
  const deleteClient = (id) => {
    // 在实际应用中，这里会调用API删除客户
    const updatedClients = clients.filter(client => client.id !== id);
    
    setClients(updatedClients);
    
    // 更新本地存储
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };
  
  const getClient = (id) => {
    return clients.find(client => client.id === parseInt(id));
  };
  
  return {
    clients,
    loading,
    error,
    addClient,
    updateClient,
    deleteClient,
    getClient
  };
};