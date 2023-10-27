# 多智协创平台(MultiMind Collaborative Platform)

## 简介

多人协作低代码平台

## 项目结构(暂时)

```md
── README.md
├── app
│ └── low-code-backend # nest 后端
│ └── low-code-backend # nest 后端
├── index.html
├── package.json
├── packages # monorepo 架构
│ ├── components # 低代码 组件
│ ├── core # 核心流程
│ ├── customized # 可定制模块
│ ├── renderer-core # 核心渲染器
│ └── server # 客户端、服务端 交互
├── pnpm-lock.yaml # pnpm lock
├── public
│ └── vite.svg
├── src
│ ├── App.tsx
│ ├── **tests** # 测试文件
│ ├── api
│ ├── assets # 静态资源
│ ├── components # 组件
│ ├── index.css
│ ├── layout # 布局文件
│ ├── main.tsx
│ ├── router # 路由
│ ├── shared # 工具库
│ └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
├── unocss.config.ts
└── vite.config.ts
```

## 当前功能

1. 拖拽功能
2. 点击组件添加功能
3. 可适配多种组件库
4. 更多个性化配置
5. 初步的多人协作
6. 基本的页面配置布局

## 即将制作的功能

1. 多人协作
2. 代码生成
3. 支持企业项目管理
   1. 包括项目管理员（创建项目者 + 当前项目的前、后台管理 + 分配人员画布管理的职责）
   2. 画布管理员（分配任务给成员、可修改当前画布信息）
   3. 项目成员（参与画布协作工作）
