import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useClients } from '../../hooks/useClients';
import { useProjects } from '../../hooks/useProjects';
import { AppContext } from '../../contexts/AppContext';

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getClient, updateClient, deleteClient, loading } = useClients();
  const { getProjectsByClient } = useProjects();
  const { addNotification } = useContext(AppContext);
  
  const [client, setClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [clientProjects, setClientProjects] = useState([]);
  
  useEffect(() => {
    const fetchClient = async () => {
      const clientData = getClient(parseInt(id));
      if (clientData) {
        setClient(clientData);
        setFormData({
          name: clientData.name,
          contactPerson: clientData.contactPerson,
          email: clientData.email,
          phone: clientData.phone,
          address: clientData.address,
          notes: clientData.notes
        });
        
        // 获取客户的项目
        const projects = getProjectsByClient(parseInt(id));
        setClientProjects(projects);
      } else {
        navigate('/clients');
        addNotification('客户不存在', 'error');
      }
    };
    
    fetchClient();
  }, [id, getClient, navigate, addNotification, getProjectsByClient]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateClient(parseInt(id), formData);
    setClient({ ...client, ...formData });
    setIsEditing(false);
    addNotification('客户信息已更新', 'success');
  };
  
  const handleDelete = () => {
    if (clientProjects.length > 0) {
      addNotification('此客户有关联项目，无法删除', 'error');
      setConfirmDelete(false);
      return;
    }
    
    deleteClient(parseInt(id));
    navigate('/clients');
    addNotification('客户已删除', 'success');
  };
  
  if (loading || !client) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {isEditing ? '编辑客户' : '客户详情'}
        </h1>
        <div className="mt-4 sm:mt-0 space-x-2">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition duration-150"
              >
                编辑
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="inline-flex items-center px-4 py-2 bg-red-600 dark:bg-red-700 border border-transparent rounded-md font-semibold text-white hover:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-600 transition duration-150"
              >
                删除
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center px-4 py-2 bg-gray-600 dark:bg-gray-700 border border-transparent rounded-md font-semibold text-white hover:bg-gray-700 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-600 transition duration-150"
            >
              取消
            </button>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">客户名称</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">联系人</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">电子邮箱</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">电话</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">地址</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">备注</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-600 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-card rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">客户信息</h3>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">客户名称</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{client.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">联系人</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{client.contactPerson}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">电子邮箱</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{client.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">电话</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{client.phone}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">地址</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{client.address}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">备注</h4>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{client.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 客户项目列表 */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">客户项目</h3>
          <Link
            to="/projects/new"
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800"
          >
            添加项目
          </Link>
        </div>
        <div className="px-6 py-5">
          {clientProjects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      项目名称
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      截止日期
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      预算
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-card divide-y divide-gray-200 dark:divide-gray-700">
                  {clientProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-3 py-4 whitespace-nowrap">
                        <Link to={`/projects/${project.id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                          {project.name}
                        </Link>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${project.status === 'active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 
                            project.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 
                            'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'}`}>
                          {project.status === 'active' ? '进行中' : 
                           project.status === 'completed' ? '已完成' : '待处理'}
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {project.dueDate}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        ¥{project.budget.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">该客户暂无项目</p>
          )}
        </div>
      </div>
      
      {/* 删除确认对话框 */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-opacity-70 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white dark:bg-dark-card">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">确认删除</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {clientProjects.length > 0 
                    ? `此客户有 ${clientProjects.length} 个关联项目，无法删除。`
                    : '确定要删除此客户吗？此操作无法撤销。'}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                {clientProjects.length > 0 ? (
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  >
                    知道了
                  </button>
                ) : (
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-600"
                    >
                      删除
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetail;