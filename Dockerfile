FROM node:18-alpine

WORKDIR /toxiplantes/

COPY public/ /toxiplantes/public
COPY src/ /toxiplantes/src
COPY package.json /toxiplantes/
RUN npm install

CMD ["npm", "start"]