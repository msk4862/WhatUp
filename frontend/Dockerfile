# pull official base image
FROM node:13.12.0-alpine

RUN mkdir /home/blog

# set working directory
WORKDIR /home/blog    

# install app dependencies
COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]




