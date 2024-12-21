FROM node:18-alpine

WORKDIR /tmp

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

RUN mkdir -p /app && mv dist /app/dist && mv node_modules /app/node_modules && mv package*.json /app/

WORKDIR /app

RUN rm -rf /tmp

ENV DATABASE_URL="" \
    PORT=3000 \
    NODE_ENV=production

EXPOSE ${PORT}

CMD ["node", "dist/main.js"]

