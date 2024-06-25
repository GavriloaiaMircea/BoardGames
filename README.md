# React + Vite

## RESTful API

CRUD - CREATE RETRIEVE UPDATE DELETE
C - POST
R - GET
U - PUT/PATCH
D - DELETE

<url-of-the-server>/api/v2/resource

users:

GET   -> /users     -> list of all users
GET   -> /users/:id -> one particular user
POST  -> /users     -> create a user
PUT   -> /users/:id -> update a user in an idempotent manner (replace the user in the DB with the user sent on the request body)
PATCH  -> /users/:id -> updates part of the user
DELETE -> /users/:id -> deletes the user

## Response codes of a RESTful API
1xx -> Informational
2xx -> Success
3xx -> Redirect
4xx -> Client Errors
5xx -> Server Errors

200 -> OK
201 -> CREATED (response to POST)
400 -> BAD REQUEST
401 -> UNAUTHORIZED
403 -> FORBIDDEN
404 -> NOT FOUND
// 418 -> I'M A TEAPOT
405 -> METHOD NOT ALLOWED
500 -> INTERNAL SERVER ERROR
502 -> GATEWAY ERROR

GET -> we get a huge body of data
POST/PUT/PATCH -> we get the created/updated resource
DELETE -> no response body

In case of errors:
The response will have the proper status code and can have a response body with among other things the error message.

