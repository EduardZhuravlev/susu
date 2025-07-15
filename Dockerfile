FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install express cors

COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]
