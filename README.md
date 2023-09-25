# 多智协创平台(MultiMind Collaborative Platform)

## 项目结构(暂时)

── README.md
├── app
│   └── low-code-backend      # nest 后端
├── index.html
├── package.json
├── packages                  # monorepo 架构
│   ├── components            # 低代码 组件
│   ├── core                  # 核心流程
│   ├── customized            # 可定制模块
│   ├── renderer-core         # 核心渲染器
│   └── server                # 客户端、服务端 交互
├── pnpm-lock.yaml
├── public
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── __tests__             # 测试文件
│   ├── api
│   ├── assets                # 静态资源
│   ├── components            # 组件
│   ├── index.css
│   ├── layout                # 布局文件
│   ├── main.tsx
│   ├── router                # 路由
│   ├── shared                # 工具库
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
├── unocss.config.ts
└── vite.config.ts
