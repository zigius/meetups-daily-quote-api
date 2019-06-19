FROM node:dubnium
EXPOSE 3010

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
