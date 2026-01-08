# 1. build frontend
FROM node:20 AS build
WORKDIR /app
COPY client ./client
RUN cd client && npm install && npm run build

# 2. production
FROM node:20-alpine
WORKDIR /app
COPY server ./server
COPY --from=build /app/client/dist ./dist
RUN cd server && npm install --production

CMD ["node", "server/index.js"]
