# feature-toggle-service

![](http://jenkins.developersworkspace.co.za:8080/job/feature-toggle-service-nightly/badge/icon)

## Getting Started

Clone the repository

`git clone https://github.com/barend-erasmus/feature-toggle-service.git`

Change to cloned directory

`cd ./feature-toggle-service`

Install node packages

`npm install`

Start project

`npm start`

Browse `http://localhost:3000/api`

## Docker Setup

`docker run --name feature-toggle-db -v /opt/feature-toggle-service/mongodb:/data/db -d mongo`

`docker build --no-cache -t feature-toggle-service ./`

`docker run -d -p 8080:3000 --name feature-toggle-service -v /logs:/logs --link feature-toggle-db:mongo -t feature-toggle-service`