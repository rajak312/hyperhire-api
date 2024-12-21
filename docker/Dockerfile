FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD ["node", "dist/main.js"]

ENV DATABASE_URL="" \
    PORT=3000 \
    NODE_ENV=production
