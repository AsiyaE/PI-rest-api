FROM node:21

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

VOLUME ["/src/node_modules"]

CMD ["npm", "start"]