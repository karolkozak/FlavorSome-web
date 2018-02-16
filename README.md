# UnnamedWebapp

# How to build and run app

Both the CLI and generated project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher.
# install angular cli
npm install -g @angular/cli

Useful for generating new modules / components / services etc. :
https://github.com/angular/angular-cli

# download all dependencies from package-lock.json
npm install 
# how to serve app on default localhost:4200 
npm start
# if you add new dependencies to package.json remember to update package-lock.json
# Warning npm install will not update package-lock.json
npm update

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `npm run build -- -prod` for a production build.

## Running unit tests

Run `npm test:unit` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.

## Running aplication tests

Run `npm run test` to execute both the unit tests and end-to-end tests.
Before running the tests make sure you are serving the app via `npm start`.

## Angular docs

Run `npm run doc` to open angular docs in web browser.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the Angular CLI use `npm run help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
