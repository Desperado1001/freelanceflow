import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 检查本地存储中是否有用户信息
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);
  
  // 登录函数
  const login = (userData) => {
    // 在实际应用中，这里会处理令牌等
    setUser(userData);
    
    // 存储用户信息到本地存储
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'dummy-token-for-demo'); // 演示用
  };
  
  // 注册函数
  const register = (userData) => {
    // 在实际应用中，这里会处理注册后的认证
    setUser(userData);
    
    // 存储用户信息到本地存储
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'dummy-token-for-demo'); // 演示用
  };
  
  // 登出函数
  const logout = () => {
    setUser(null);
    
    // 清除本地存储
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };
  
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};