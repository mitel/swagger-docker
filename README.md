# Test environment for documenting an API with Swagger
Just edit your yaml file and npm run deploy to see the result in the browser

####Scrips:
  * ```Dockerfile``` - docker image descriptor. Builds a docker image running Swagger-UI exposed on port 8080
  * ```supervisord.conf``` - supervisor is used as daemon manager to run a Python SimpleHTTPServer to server Swagger-UI
  
####Install & use: 
  * run ```npm install``` 
  * run ```npm run deploy``` and follow the log
  * for Mac users: configure your VM to forward port 8080 to your physical host
  * open a browser to http://localhost:8080 
  * ```docker exec -it swagger bash``` if you wanna see what's inside
