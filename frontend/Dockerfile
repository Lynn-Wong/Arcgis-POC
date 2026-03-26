FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --registry=https://registry.npmmirror.com
COPY . .
# 打包命令，根据项目调整（Vue是npm run build，React是npm run build）
RUN npm run build
# 查看app/目录下的产物
RUN ls -la /app/dist

# 阶段2：用Nginx运行静态文件
FROM nginx:alpine AS production-stage
# 复制打包后的文件到Nginx默认目录
COPY --from=build-stage /app/dist /usr/share/nginx/html
# 关键：复制自定义 nginx.conf 覆盖容器默认配置(否则项目的try_files不生效)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口（内部端口，可自定义）
EXPOSE 4200
# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]