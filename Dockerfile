FROM node:14

ENV TZ=America/Mexico_City

WORKDIR /app
COPY package.json ./
COPY api/package.json ./api/
COPY client/package.json ./client/
RUN npm install

WORKDIR /app/api
RUN npm install

WORKDIR /app/client
RUN npm install

WORKDIR /app
RUN npm install bcrypt

COPY . .

WORKDIR /app/client
RUN npm run build

WORKDIR /app

EXPOSE 9000
CMD ["npm", "start"]
