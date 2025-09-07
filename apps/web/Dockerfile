FROM node:20-alpine
WORKDIR /app
COPY . .
RUN pnpm install --filter @business-crm/web... --prod && pnpm --filter @business-crm/web build
EXPOSE 3000
CMD ["pnpm", "--filter", "@business-crm/web", "start"]
