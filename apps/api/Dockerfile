FROM node:20-alpine
WORKDIR /app
COPY . .
RUN pnpm install --filter @business-crm/api... --prod && pnpm --filter @business-crm/api build
EXPOSE 4000
CMD ["node", "apps/api/dist/index.js"]
