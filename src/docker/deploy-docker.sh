#!/bin/bash

# executed by npm run docker-deploy - see package.json

docker stop swagger; 
docker rm swagger; 
docker build -t mitel/swagger build/docker/; 
docker run -d --name=\"swagger\" -p 8080:8080 -p 8000:8000 mitel/swagger; 
docker logs -f swagger;