# FreeLanceFlow - 自由职业者工作流管理工具

FreeLanceFlow是一个为自由职业者设计的综合工作流管理工具。帮助自由职业者高效管理项目、任务、时间和财务，提升工作效率和收益。

## 功能特性

- 📋 **项目管理**：轻松创建和跟踪多个客户项目
- 👥 **客户管理**：管理客户资料、联系方式及其关联项目
- ✅ **任务管理**：将项目分解为可管理的任务，设置优先级和截止日期
- ⏱️ **时间追踪**：记录在各项目上花费的时间，生成详细的工时报告
- 💰 **财务管理**：创建专业发票，追踪付款状态
- 📊 **数据分析**：通过清晰的仪表盘和报表了解工作和财务状况
- 🌓 **主题切换**：支持明亮/暗黑模式，保护视力

## 技术栈

- **前端**：React.js + Tailwind CSS
- **状态管理**：React Context API
- **数据持久化**：LocalStorage
- **路由**：React Router
- **响应式设计**：适配桌面端和移动端
- **部署**：GitHub Pages

## 快速开始

### 在线演示

访问我们的在线演示：[FreeLanceFlow Demo](https://Desperado1001.github.io/freelanceflow)

演示账户：
- 邮箱：demo@example.com
- 密码：password

### 本地运行

1. 克隆仓库
   ```bash
   git clone https://github.com/Desperado1001/freelanceflow.git
   cd freelanceflow
   ```

2. 安装依赖
   ```bash
   npm install
   # 或使用cnpm加速安装
   cnpm install
   ```

3. 启动开发服务器
   ```bash
   npm start
   ```

4. 打开浏览器访问 http://localhost:5173

## 项目结构

```
src/
├── components/       # 组件目录
│   ├── auth/         # 认证相关组件
│   ├── clients/      # 客户管理组件
│   ├── dashboard/    # 仪表盘组件
│   ├── invoices/     # 发票管理组件
│   ├── layout/       # 布局组件
│   ├── projects/     # 项目管理组件
│   ├── reports/      # 数据报表组件
│   ├── tasks/        # 任务管理组件
│   └── time/         # 时间管理组件
├── contexts/         # 上下文管理
│   ├── AppContext.jsx     # 应用上下文
│   ├── AuthContext.jsx    # 认证上下文
│   └── ThemeContext.jsx   # 主题上下文
├── hooks/            # 自定义钩子
│   ├── useAuth.js         # 认证钩子
│   ├── useClients.js      # 客户管理钩子
│   └── useProjects.js     # 项目管理钩子
└── App.jsx           # 应用入口
```

## 主要特性说明

### 客户管理

管理您的客户信息，包括联系人、邮箱、电话等。每个客户可以关联多个项目，方便您跟踪与每个客户的合作关系和项目进度。

### 数据报表

提供收入分析、客户项目统计、项目状态分布等多种数据可视化报表，帮助您了解业务情况，做出更明智的决策。

### 主题切换

支持明亮和暗黑两种主题模式，根据个人偏好或环境光线选择合适的显示模式，提高使用体验，保护视力。

### 本地数据持久化

所有数据都保存在浏览器的本地存储中，即使刷新页面或关闭浏览器，您的数据也不会丢失。

## 联系方式

如有任何问题，请通过以下方式联系：

- GitHub: [@Desperado1001](https://github.com/Desperado1001)

## 致谢

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)