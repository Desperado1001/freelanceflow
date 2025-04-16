#!/bin/bash
# FreeLanceFlow Vercel部署脚本

echo "=== FreeLanceFlow Vercel部署脚本 ==="
echo "确保您已登录Vercel账号"

# 确保Vercel CLI已安装
if ! command -v vercel &> /dev/null; then
    echo "正在安装Vercel CLI..."
    npm install -g vercel
fi

echo "开始部署到Vercel..."

# 运行Vercel部署命令
vercel --prod

echo "部署完成！"
