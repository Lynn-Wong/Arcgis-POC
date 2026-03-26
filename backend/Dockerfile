# 1. 选择 Node 基础镜像，推荐 alpine 轻量化版本
FROM node:18-alpine

# 2. 设置容器内的工作目录，后续命令都在这个目录执行
WORKDIR /app

# 3. 复制根目录的 package.json 和 package-lock.json 到工作目录
# 先复制依赖文件，利用 Docker 缓存，避免每次代码改动都重新安装依赖
COPY package*.json ./

# 4. 安装依赖
RUN npm install --registry=https://registry.npmmirror.com

# 5. 复制根目录的 src 文件夹到容器的工作目录 /app 下
# 这一步会把本地 src 里的 server.js 复制到容器的 /app/src/ 目录
COPY src ./src

# 6. 暴露 node 服务监听的端口（和 server.js 里的端口一致）
EXPOSE 3000

# 7. 容器启动命令：运行 src 目录下的 server.js
CMD ["node", "src/server.js"]