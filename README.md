# README

This repo is a demonstration of a Functional Reactive Programming frontend
using Kefir.js, React.js, and Immutable.js.  It also includes a small backend
in order to allow the frontend to demo ajax calls

## Running
To start the backend, go into the `backend` directory and run `mvn jetty:run`.
mvn must be installed on your system.

To start the frontend, go into the `frontend` directory and run `npm start`.
npm and node must be installed on your system.  Before running the frontend, you
must run `npm install` in order to download dependencies.

Once everything is running, visit http://localhost:8000/target/dist/index.html
in your browser.
