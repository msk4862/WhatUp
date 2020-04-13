# pull official base image
FROM python:3.7-slim

RUN mkdir /home/blog-backend

# set working directory
WORKDIR /home/blog-backend

# install app dependencies


RUN npm ci

COPY . .

EXPOSE 8000

CMD ["python", "runserver"]




