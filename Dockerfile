FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .
COPY src/prisma ./prisma/
RUN npm ci --include=dev
COPY . .
# 移动src目录内容到项目根目录
RUN mv src/app ./ && \
    mv src/components ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV production
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json .
COPY --from=builder /app/next.config.ts .
COPY --from=builder /app/next-i18next.config.ts .
COPY --from=builder /app/src/prisma ./prisma
EXPOSE 3000
CMD ["npm", "start"]