# Nodejs-backend-challenge
## How to setup locally for running : -
1. Type "npm i" in terminal to install all required dependencies.

2. Create a ".env" file with the following fields:
   - DB_LINK = { mongodb connection link }
   - ACCESS_TOKEN_SECRET = { secret key for jwt token }
   - PORT = { port number for running application }
  
3. Type "npm run start" in terminal to start the server

## RESTful API endpoints : -
1. User registeration
   - Route -->  /api/users/signup
   - Access --> public
   - Method --> POST
   - Request body --> firstName, lastName (optional), email, password, confirmPassword
  
2. User login
   - Route --> /api/users/login
   - Access --> public
   - Method --> POST
   - Request body --> email, password
  
3. Edit profile
   - Route --> /api/users/updateprofile
   - Access --> protected
   - Method --> PUT
   - Request body --> firstName (optional), lastName (optional), password (optional)
   - Request authorization --> Token (bearer token)  = { jwt token }
  
4. View profile
   - Route --> /api/users/viewprofile
   - Access --> protected
   - Method --> GET
   - Request authorization --> Token (bearer token)  = { jwt token }

5. Create post
   - Route --> /api/posts
   - Access --> protected
   - Method --> POST
   - Request body --> title, content
   - Request authorization --> Token (bearer token)  = { jwt token }

6. Retrieve posts
   - Route --> /api/posts
   - Access --> protected
   - Method --> GET
   - Request authorization --> Token (bearer token)  = { jwt token }

7. Retrieve specific post
   - Route --> /api/posts/:id
   - Access --> protected
   - Method --> GET
   - Request authorization --> Token (bearer token)  = { jwt token }

8. Add comment
   - Route --> /api/comments/addcomment
   - Access --> protected
   - Method --> POST
   - Request body --> postId, commentText
   - Request authorization --> Token (bearer token)  = { jwt token }