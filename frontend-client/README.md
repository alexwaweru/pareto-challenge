## Backend

### Technology Stack

- [Django](https://pypi.org/project/Django/) 5.0.1 - main api framework
- [Django Rest Framework](https://www.django-rest-framework.org/) 3.14.0 - to create & expose rest api
- [Sqllite3](https://www.sqlite.org/docs.html) 0.13.0 - simple database for poc
- [Algolia Search](https://www.algolia.com/) 0.13.0 - to index the project entries and expose a search client

###### For Local Development

1. Run `git clone `
2. Navigate to backend root `cd ./backend-api`
3. Create a virtual env `python3 -m venv venv`
4. Actvate virtual env `source venv/bin/activate`
5. Install dependencies `pip3 install -r requirements.txt`
5. Run the server in port 8000 `python3 manage.py runserver 8000`
6. Test it out at `http://127.0.0.1:8000/api/`

###### And that's it with the caveat of setting up, configuring and getting the backend server running.


## Frontend

### Technology Stack

- [React](https://pypi.org/project/Django/) 5.0.1 - main api framework
- [React router](https://www.django-rest-framework.org/) 3.14.0 - to create & expose rest api

###### For Local Development

1. Run `git clone `
2. Navigate to frontend root `cd ./frontend-client`
3. Install dependencies `npm install`
4. Run the server in port 3000 `npm run dev -- --port 3000`

###### And that's it with the caveat of setting up, configuring and getting the frontend application running.
