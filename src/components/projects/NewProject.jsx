import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const NewProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    startDate: '',
    deadline: '',
    budget: '',
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { addNotification } = useContext(AppContext);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // 清除该字段的错误
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '项目名称不能为空';
    }
    
    if (!formData.client.trim()) {
      newErrors.client = '客户名称不能为空';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = '请选择开始日期';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = '请选择截止日期';
    } else if (formData.startDate && new Date(formData.startDate) > new Date(formData.deadline)) {
      newErrors.deadline = '截止日期不能早于开始日期';
    }
    
    if (!formData.budget) {
      newErrors.budget = '请输入项目预算';
    } else if (isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
      newErrors.budget = '预算必须是正数';
    }
    
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 在实际应用中，这里会调用API创建项目
      addNotification('项目创建成功', 'success');
      navigate('/projects'); // 返回项目列表
    } catch (error) {
      console.error('创建项目失败', error);
      addNotification('创建项目失败，请重试', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">创建新项目</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                项目名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm ${
                  errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                客户名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="client"
                name="client"
                value={formData.client}
                onChange={handleChange}
                className={`block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm ${
                  errors.client ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.client && (
                <p className="mt-1 text-sm text-red-500">{errors.client}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                开始日期 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm ${
                  errors.startDate ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                截止日期 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={`block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm ${
                  errors.deadline ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.deadline && (
                <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                项目预算 (元) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                min="0"
                step="1"
                className={`block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm ${
                  errors.budget ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.budget && (
                <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              项目描述
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  处理中...
                </div>
              ) : '创建项目'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProject;