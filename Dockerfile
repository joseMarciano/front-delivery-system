FROM node:16

WORKDIR /home/app

COPY . /home/app/

RUN npm install && npm run build && npm install -g serve

CMD ["serve", "-s", "build"]