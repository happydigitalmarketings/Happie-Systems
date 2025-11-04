
RUN LOCALLY Client: 

docker build -t client --build-arg REACT_APP_BACKEND_URL=http://host.docker.internal:9000 .
docker run -p 8000:80 client




RUN LOCALLY BACKEND: 

docker build -t backend-server .
docker run -p 9000:9000 -e MONGODB_URL=mongodb://host.docker.internal:27017/Productlist backend-server



To Run Docker Local Setup

docker build -up

Mango Db Url:
faizalkhans
8nbSop8mXO2LdQOl

mongodb+srv://faizalkhans:DFVVV40KkA9sBpKIcluster0.exlst.mongodb.net/Productlist?retryWrites=true&w=majority


