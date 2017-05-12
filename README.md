# ch-focus-bridge


## Setup

1. Check the npm packages:

    ```
    npm install
    ```

2. Runs eslint, babel:dist and mochaTest

    ```
    grunt
    ```

3. Start the application

    ```
    node dist/api.js
    ```

## Managing the project with Grunt

* Runs eslint, babel:dist and mochaTest

    ```
    grunt
    ```

* Runs the tests (the same as ```npm test```) 

    ```
    grunt test
    ```

* Compiles the .es6 files to .js
 
    ```
    grunt babel
    ```