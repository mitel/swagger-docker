# the base image - Debian/jessie with Java8
FROM java:8 

RUN apt-get update && apt-get upgrade -y && \
	apt-get install -y wget && \
	apt-get -y install supervisor && \
	mkdir -p /var/log/supervisor

WORKDIR /

# download and invoke NVM installer from github
# nvm is a tool that makes node.js installation smooth
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.26.1/install.sh | bash

# set nvm dir 
ENV NVM_DIR /root/.nvm

# install stable node and use it
RUN . ~/.nvm/nvm.sh && nvm install 4.0.0


## start deploying the swagger part
# install yaml to json converter
RUN . ~/.nvm/nvm.sh && nvm use 4.0.0 && npm install -g yamljs

# clone the swagger-ui repository from github
RUN git clone https://github.com/swagger-api/swagger-ui.git

# copy the YAML specification
ADD rest_api.yaml /swagger-ui/dist/rest_api.yaml
ADD index.html /swagger-ui/dist/index.html

WORKDIR /swagger-ui/dist

# convert the yaml file to json so it can be loaded by swagger-ui
RUN . ~/.nvm/nvm.sh && nvm use 4.0.0 && yaml2json ./rest_api.yaml > ./rest_api.json 
## end deploying the swagger part

# Supervisor Configuration
ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# optional - not used 
# ADD server.js /hapijs-server/server.js

# 8080 = python web server running swagger-ui for the API documentation
# 8000 = node.js server based on HapiJs running the API proxy/wrapper
EXPOSE 8000 8080

USER root

# Default command when starting the container
# starts OrietnDB and loads a test database
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
