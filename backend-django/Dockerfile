# pull official base image
FROM python:3.7-slim

RUN mkdir /code

# set working directory
WORKDIR /code

COPY . /code/

# install app dependencies
RUN pip install -r requirements.txt

