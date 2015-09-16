#!/bin/bash

# prepare the resources needed to build the docker image
mkdir build/docker;
cp src/docker/Dockerfile build/docker;
cp src/docker/supervisord.conf build/docker;
cp src/swagger/rest_api.yaml build/docker;
cp src/swagger/index.html build/docker;
# cp build/server/server.js build/docker;