FROM node

WORKDIR /usr/src/gds
COPY package.json ./
RUN npm install
RUN npm build

COPY ./out ./

CMD ["npm", "run", "start"]