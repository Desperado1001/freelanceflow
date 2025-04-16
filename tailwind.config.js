/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 启用类名控制的暗黑模式
  theme: {
    extend: {
      colors: {
        primary: {
          // 主色调
          light: '#3B82F6', // 默认蓝色
          dark: '#2563EB',  // 深色下的蓝色
        },
        // 背景颜色
        'dark-bg': '#1E293B',
        'dark-card': '#334155',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}