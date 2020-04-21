# Supper API
Supper is an application to connect home inspired cooks and consumers in an easy to use platform.

## Main Technologies Used
- TypeScript (https://www.typescriptlang.org/)
- Koa (https://koajs.com/)
- MongoDB (https://www.mongodb.com/)
- AWS (https://aws.amazon.com/)

## Usage
This API was developed using node version `12.13.0`. Although it has been tested on version `8.17.0`. We recommend to use atleast version `12.*`. 

First clone the repository and install dependencies.
```
npm install
```

You must create an environment file. Create a `.env` file along side the `src` folder and copy and paste the following variables. Make sure to get the `JWT_KEY` from the owner.
```
API_PORT=5000
MONGODB_URL=mongodb://127.0.0.1:27017/supper
JWT_KEY=
```

Then build the source code. A `dist` folder will be generated.
```
npm run build
```

Run the test suite to ensure everything above was done correctly.
```
npm run test
```

Run the API server.
```
npm start
```

## Using Docker
To run backend with MongoDB use `docker-compose`:
```
docker-compose up
```
The `-d` detached command allows you to run the containers without console output.

To access the bash of each docker container:
```
docker exec -it <docker-name> bash
```

To shutdown the docker containers and network:
```
docker-compose down
```

To build the backend docker container individually:
```
docker build -t supper-backend .
```

To run the backend docker container individually:
```
docker run --env-file .env --name supper-backend supper-backend
```

To run the MongoDB container individually:
```
docker run --name mongodb mongo
```

## Documentation
To come...
