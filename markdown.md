# React3DRE

## Background
This project is a front-end project based on [React](https://react.dev/) and [Ant Design Pro](https://pro.ant.design). The purpose is to create a platform for operating and displaying Nerf models.

## Install

Install `node_modules`:


```bash
npm install
```

## Usage

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

#### Start project

```bash
npm start
```

#### Build project

```bash
npm run build
```

#### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

#### Test code

```bash
npm test
```

#### More

You can view full document on their [official website](https://pro.ant.design). 

## Project Details

### directory structure

```bash
├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.ts            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json           
```

Some commonly used files：

```bash
├── config                   # 
│   ├── defaultSettings.ts   # 总体布局
│   ├── proxy.ts             # 代理配置
│   └── routes.ts            # 路由
├── src
│   └── components           # 一些通用组件
│       └── Viser            # 模型渲染页面的组件实现
│
├── service
│   └── ant-design-pro 
│       ├── api.ts           # 后端api请求的实现
│       └── typings.d.ts     # 请求参数和响应数据的类型别名,规范使用可参考脚手架中login请求的处理。
├── reducer.js               # redux定义了一系列initial state和修改state数据的action
├── store.js
```
Pages：
```bash
├── CreateModel              # 
│   ├── upload               # 上传图片创建模型(分步上传图片文件)
│   └── Create_model         # 分步表单，暂时弃用
├── ShowModel                # 后续会修改Nerfstudio代码
│   ├── App.jsx              # 
│   └── ShowModel            #
├── Welcome                  # workspace主页，查看project，点击跑colmap，点击渲染等
```
