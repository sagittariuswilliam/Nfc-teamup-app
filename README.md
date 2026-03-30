# 碰一碰组队 (NFC TeamUp)

基于 NFC 碰一碰技术的即时组队社交应用

## 📱 项目简介

NFC TeamUp 是一款基于 NFC 技术的即时组队社交应用，让用户通过简单的"碰一碰"操作快速组建临时队伍，支持实时聊天、位置共享、文件共享等功能。

## 🛠️ 技术栈

- **React Native** 0.73+ - 跨平台移动应用框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **React Navigation 6** - 路由和导航
- **Zustand** - 轻量级状态管理
- **Socket.IO Client** - 实时通信

## 📂 项目结构

```
nfc-teamup-app/
├── src/
│   ├── components/        # 通用组件
│   │   ├── Button.tsx     # 按钮组件
│   │   ├── Input.tsx      # 输入框组件
│   │   ├── Card.tsx       # 卡片组件
│   │   └── Avatar.tsx     # 头像组件
│   ├── screens/           # 页面组件
│   │   ├── SplashScreen.tsx      # 启动页
│   │   ├── LoginScreen.tsx       # 登录页
│   │   ├── RegisterScreen.tsx    # 注册页
│   │   ├── HomeScreen.tsx        # 首页（未组队）
│   │   ├── TeamSpace.tsx         # 队伍空间
│   │   ├── ChatTab.tsx           # 聊天 Tab
│   │   ├── MapTab.tsx            # 地图 Tab
│   │   ├── FileTab.tsx           # 文件 Tab
│   │   ├── InfoTab.tsx           # 信息 Tab
│   │   └── ProfileScreen.tsx     # 个人中心
│   ├── navigation/        # 导航配置
│   │   └── AppNavigator.tsx
│   ├── store/             # 状态管理
│   │   ├── userStore.ts   # 用户状态
│   │   └── teamStore.ts   # 队伍状态
│   ├── utils/             # 工具函数
│   └── assets/            # 静态资源
├── __tests__/             # 测试文件
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
└── README.md
```

## 🎨 设计规范

- **主色**: 科技蓝 #1890FF
- **栅格系统**: 8px 基准
- **圆角规范**: 
  - 按钮：8px
  - 卡片：12px
  - 输入框：8px
  - 头像：圆形

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- React Native CLI
- Xcode (iOS) / Android Studio (Android)

### 安装依赖

```bash
npm install
```

### iOS 运行

```bash
cd ios && pod install && cd ..
npm run ios
```

### Android 运行

```bash
npm run android
```

## 📅 开发进度

### 第 1 周：项目初始化 ✅

- [x] 创建 React Native + TypeScript 项目
- [x] 配置 ESLint + Prettier
- [x] 配置项目结构
- [x] 安装依赖配置

### 第 2 周：基础组件开发 ✅

- [x] 实现主题配置 (theme.ts)
- [x] 实现 Button 组件
- [x] 实现 Input 组件
- [x] 实现 Card 组件
- [x] 实现 Avatar 组件

### 第 3-4 周：核心页面开发 🔄

- [x] 启动页 (SplashScreen.tsx)
- [x] 登录页 (LoginScreen.tsx)
- [x] 注册页 (RegisterScreen.tsx)
- [x] 首页 (HomeScreen.tsx)
- [x] 队伍空间 (TeamSpace.tsx)
- [x] 聊天 Tab (ChatTab.tsx)
- [x] 地图 Tab (MapTab.tsx)
- [x] 文件 Tab (FileTab.tsx)
- [x] 信息 Tab (InfoTab.tsx)
- [x] 个人中心 (ProfileScreen.tsx)

### 第 5 周：功能集成 ⏳

- [ ] NFC 模块集成 (react-native-nfc-manager)
- [ ] 地图模块集成 (react-native-maps + 高德 SDK)
- [ ] 文件上传下载
- [ ] 即时通信 (WebSocket)

### 第 6 周：测试优化 ⏳

- [ ] 单元测试
- [ ] 性能优化
- [ ] Bug 修复
- [ ] 打包发布

## 📝 待办事项

1. 安装实际依赖包
2. 配置 iOS/Android 原生模块
3. 集成 NFC 功能
4. 集成地图功能
5. 实现后端 API 对接
6. 添加单元测试

## 📄 许可证

MIT

---

**设计师**: 慕容婉儿 🌸
**开发日期**: 2026-03-28
