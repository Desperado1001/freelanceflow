# FreeLanceFlow 项目 Vercel 部署指南

本文档提供如何将 FreeLanceFlow 项目部署到 Vercel 的详细说明。

## 前提条件

1. 拥有 Vercel 账号
2. 将项目代码推送到 GitHub

## 部署方法

### 方法一：使用 Vercel 网站界面

1. 登录 [Vercel](https://vercel.com)
2. 点击 "Import Project"
3. 选择 "Import Git Repository"
4. 授权并选择 `freelanceflow` 仓库
5. 配置项目:
   - 框架预设: Vite
   - 构建命令: `npm run build`
   - 输出目录: `dist`
6. 点击 "Deploy"

### 方法二：使用命令行工具

1. 在本地克隆项目 (如果尚未克隆)
   ```bash
   git clone https://github.com/Desperado1001/freelanceflow.git
   cd freelanceflow
   ```

2. 安装 Vercel CLI
   ```bash
   npm install -g vercel
   ```

3. 登录 Vercel
   ```bash
   vercel login
   ```

4. 部署项目
   ```bash
   vercel --prod
   ```

5. 或者使用我们提供的脚本
   ```bash
   chmod +x deploy-to-vercel.sh
   ./deploy-to-vercel.sh
   ```

### 方法三：使用 GitHub Actions 自动部署

已配置了 GitHub Actions 工作流，每次推送到 `main` 分支时自动部署。

要使用此方法:

1. 在 GitHub 仓库的设置中添加以下 secrets:
   - `VERCEL_TOKEN`: 您的 Vercel API 令牌
   - `VERCEL_ORG_ID`: 您的 Vercel 组织 ID
   - `VERCEL_PROJECT_ID`: 您的 Vercel 项目 ID

2. 推送更改到 `main` 分支即可触发自动部署

## 路由配置

已配置 `vercel.json` 文件以确保客户端路由正常工作：

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 注意事项

- 部署后，您的应用将可在 `https://freelanceflow.vercel.app` 或类似的 URL 上访问
- 如需使用自定义域名，可在 Vercel 项目设置的 "Domains" 部分进行配置
- 在 Vercel 上查看部署日志以解决可能出现的问题

## 故障排除

如果您遇到任何部署问题：

1. 检查 Vercel 的部署日志
2. 确认 `vite.config.js` 中设置了正确的 `base` 路径 (应为 '/')
3. 验证 `vercel.json` 文件包含了正确的重写规则
