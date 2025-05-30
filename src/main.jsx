import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 创建根元素
const root = ReactDOM.createRoot(document.getElementById('root'));

// 渲染应用
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);