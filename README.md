# 1. 配置config.js
## config.js >> cookie
通过chrome debugger network查看request头，拷贝Request Headers中的Cookie到

## config.js >> orderList
配置下单的条件：等级和价格上限

# 2. 运行
## 下载最新版本nodejs

## 项目目录下安装依赖包
```bash
npm i
```

### 项目目录下运行
```bash
npm run start
```

### 符合购买条件时输入验证码
- 验证码在项目目录下out.png
- 验证码格式为[a][空格][验证码]，如下
```bash
  a xxxx
```