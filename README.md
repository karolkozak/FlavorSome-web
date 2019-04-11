# FlavorSome-web

## How to start

1. Install [nvm](https://github.com/coreybutler/nvm-windows/releases). You can skip this step and install Node.js on your own.
1. Install Node.js (at least 8.3 version is required). Run in console `nvm install 9.11.1` and then `nvm use 9.11.1`.
1. Clone this repository to your local directory.
1. Copy sample files from `src/environments` directory and remove ".sample" from names. Fill props with your own values.
1. Run in console `npm install -g @angular/cli`;
1. Run in console `npm install`.
1. Run in console `npm run start:qa`.

## How to build app using local backend server

1. Run Neo4J database.
1. Start [FlavorSome micro service](https://github.com/karolkozak/FlavorSome).
1. Run in console `npm start`.
1. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## How to build app using qa server

1. Run in console `npm run start:qa`.
1. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

To create module / component / service / directive use following commands:

 - Run `ng generate module path/module-name` to generate a new module.
 - Run `ng generate component path/component-name` to generate a new component.
 - Run `ng generate service path/service-name` to generate a new service.
 - Run `ng generate directive path/directive-name` to generate a new directive.

You can also use shorthanded versions: `ng g <m | c | s | d> path/name`.
