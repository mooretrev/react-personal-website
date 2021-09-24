FROM node:14

ENV TZ=America/Mexico_City

WORKDIR /app
COPY package.json ./
COPY api/package.json ./api/
COPY client/package.json ./client/
RUN npm install

WORKDIR /app/api
RUN npm install --production

WORKDIR /app/client
RUN npm install --production

WORKDIR /app
RUN npm install bcrypt
RUN npm install ts-node
RUN npm install typescript@3.9

COPY . .

WORKDIR /app/client
RUN npm run build

WORKDIR /app

EXPOSE 9000
CMD ["npm", "start"]
