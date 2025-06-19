FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json .
COPY prisma ./prisma/
RUN npm ci --include=dev
COPY . .
RUN npm run build


FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/package*.json .
RUN npm ci --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts .
COPY --from=builder /app/next-i18next.config.ts .
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["npm", "start"]