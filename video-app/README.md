This project is simply to have FUN!

This project is about a video and chat web-application. 
The communication may be done through keyboard or by voice recognition through microphone.

![Alt Text]('./src/staticsources/video.gif')


## Architecture

The architecture is a typical client-server application, where there may be multiple client.

## Technologies

Front: React,Sass and socket-io
Back: Nodejs and socket-io

## Running the application

### How to run the client

clone the project and simply run in the console: npm start

### How to run the server

clone the project and simply run in the console: nodemon index.js


#### Limitations

- Still not deployed, it works in localhost. Two cameras are not available!
- To be deployed and to use the chat, it is necessary to run it outside localhost, and in https. So the server needs to be in https and install autosigned certs. This is imposed by security in browser env.
- Improve some styling and responsiveness
