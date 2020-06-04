### Voicemod backend hiring exercise

This is an exercise for Voicemod developed following DDD and Clean Architecture patterns and principles. For the sake of simplicity, and due to the brevity of problems stated in the exercise, next concepts are out of the scope: 

- CQRS
- EventSourcing 

## How to run

> In order to run the backend server, you need to have both, **docker** and **docker-compose** installed. 

Go to root folder and run *docker-compose up*. It will take a while for downloading the different docker images from Dockerhub. Afterwards you can start hitting the [API](https://github.com/NormanColoma/voicemod-backend/blob/master/API.MD)

In case you can't run it via docker or docker-compose, you'll need to set up somehow a `MongoDB` locally. Within root folder run following steps:

- run `npm install`
- run `npm start`


