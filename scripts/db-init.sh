#!/bin/sh
# 等待数据库就绪
until nc -z postgres 5432; do
  sleep 1
done

# 执行数据库迁移和种子
npx prisma migrate deploy
npx prisma db seed

# 启动应用
exec npm start