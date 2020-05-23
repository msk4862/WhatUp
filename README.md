## Blogs web app developed with React-Django.
A simple Full stack project to understand the entire flow from frontend to backend.

## Getting Started

#### 1. Go to `frontend` folder
First install dependencies:
```
npm install
```

Then run using:
```
npm start
```

It Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

#### 2. Go to `backend-django` folder

Create a virtual environment to install dependencies in and activate it:

```
pipenv shell
```
Then install the dependencies:

```
pipenv install
```

Then perform all unapplied migrations:
```
python manage.py migrate
```

Then run 
```
python manage.py runserver
``` 
It will start django admin.<br/>
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

## Getting started using Docker
Build:
```
docker-compose build
```

Run:
```
docker-compose up
```

There should now be two servers running:

[http://http://127.0.0.1:3000](http://http://127.0.0.1:3000) is the Django app.<br/>
[http://http://127.0.0.1:8000](http://http://127.0.0.1:8000) is the React app.

<br/><br/>
### Give it a :star2: to show your support :smiley::smiley:
### And of course, feel free for any kind of contributions.
