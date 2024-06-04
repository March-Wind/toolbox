1. npm init
2. npm i lerna
3. npx lerna init --packages="packages/\*"
   <!-- 这里需要用户输入 -->
   <!-- 4. npx lerna create @marchyang/enhanced_promise --es-module -->
4. 创建项目

   - 创建@marchyang/≈
   - 在目录里面执行：npx --ignore-local @marchyang/create-react-app@latest

5.

### 改造指南

> 所有的依赖项都可以在根目录进行安装，项目配置可以放在根目录。根据这个`yarn workspace @comp/util add axios`这句话来安装子模块的依赖项，然后就可以在根目录执行`yarn`来安装整体的依赖项

1. lerna 8 版本指南：https://juejin.cn/post/7348659175927283722
