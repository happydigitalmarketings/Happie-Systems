faizalkhans
DFVVV40KkA9sBpKI

https://github.com/vipullsingh/product-listing-react

We have create two folders 

1. client   - Frontend
2. server   - Backend


We are not using docker to deploy in the server..


we are deploying both frontend and backend in vercel

vercel url : https://vercel.com/

login credientialusing Gmail account personal account


we are deploying database in MangoDb

mangoDb: https://cloud.mongodb.com/

crediential

username : faizalkhans
password : 8nbSop8mXO2LdQOl
Databasename : Productlist

MONGODB_URL=mongodb+srv://faizalkhans:8nbSop8mXO2LdQOl@cluster0.exlst.mongodb.net/Productlist?retryWrites=true&w=majority&appName=Cluster0


To Run backend server 

url : http://localhost:9000

local mongodb key * values => MONGODB_URL="mongodb://127.0.0.1:27017/Productlist"

we have three .env files

1. .env 

2. .env.development

   MONGODB_URL="mongodb://127.0.0.1:27017/Productlist"
   PORT=9000
     
3. .env.production

   MONGODB_URL=mongodb+srv://faizalkhans:8nbSop8mXO2LdQOl@cluster0.exlst.mongodb.net/Productlist?retryWrites=true&w=majority&appName=Cluster0
