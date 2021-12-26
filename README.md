# Description

This project born with the goal to show how works the following technologies in a demo project as a **SPA TODO APP**:

* React - https://reactjs.org/
* Redux/Redux toolkit - https://redux-toolkit.js.org/
* Webpack with custom configuration with features like: purgecss, eslinter, minification etc. - https://webpack.js.org/
* Typescript - https://www.typescriptlang.org/
* Prettier - https://prettier.io/
* Husky - https://github.com/typicode/husky
* Lint staged - https://github.com/okonet/lint-staged
* Docker - https://www.docker.com
* And others else...



# Dev Section

## Prerequistes

* Node version greater than **14.0.0**



## Getting started

- `npm i` - Download dependencies and setup husky's configs for git hooks

- `npm start` - Run **npm run dev** and **npm run mock** simultaneously

- Open browser page on `http://localhost:3000`;

  

## Testing

- `npm test` - Runs unit tests on the components and libraries with **JEST**.

  

## Debug REDUX state management

It is recommended to use this [chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=it).



## Others commands

- `npm run mock` - Run mock server (http://localhost:8000)
- `npm run dev` - Run watch reload server for frontend app (http://localhost:3000)
- `npm run build`- Generate static files on dist folder
- `npm run linter`- Check and try fixing the linting of the project
- `npm run linstaged`- Run all the quality check processes of the code for those files are staged in git in pending to be committed. This command is launched automatically through the git hooks pre commit action.
- `npm run prettier` - Run prettier for prettify the code following some standard rules



# Deploy section



## Build

The build process will generate a dist folder where there will be contained all the static files ready to be deployed on some webserver.
For the build process launch the following command: `npm run build`.



## Configuration of application

As you can notice after the build process will be generated a **configs** folder, where there will be all the configurations json files which the SPA application will load through **HTTP fetch request** at the bootstrap (At every reload of the page). You can edit the configurations files with the **enviroment** values.



## Docker Usage
The project contains a docker file which creates a docker image with a nginx webserver embed ready to serve the **SPA** app.

With the terminal move on the root project and then:

<hr>

### **Create and run the image**

#### **Build**

`docker build -f ./docker/Dockerfile -t react-boilerplate:1.0 . `

#### **Run a container**

`docker run --rm --name test_react_container -v $(pwd)/docker/configs:/usr/share/nginx/html/configs -p 8080:80 react-boilerplate:1.0`

**N.B.**:

In this example we will mount our configs folder in order to override the application's default configurations.  

<hr>

### **Run with docker compose**

`docker-compose -f docker/docker-compose.yml up`

In this case will be runned two containers:

* Nginx container which serves the SPA application files
* Mock container will serves all application's mocked routes
