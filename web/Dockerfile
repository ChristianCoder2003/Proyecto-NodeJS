FROM node:19.4.0
WORKDIR /app
COPY src/ .
RUN npm install -g nodemon
RUN npm install nodemon -D
RUN npm install

CMD ["npm", "run", "start.dev"]

EXPOSE 3000