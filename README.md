Employee Scheduling
===================

MEAN (Mongo, Express, Angular, Node) - An employee scheduling application.

## Technologies Used

* **Client Side:**
    * [AngularJS](http://angularjs.org/)
    * [HTML5](http://www.w3.org/TR/2011/WD-html5-20110525/)
    * [CSS3](http://www.w3.org/TR/2001/WD-css3-roadmap-20010523/)
    * [Bootstrap 3](http://getbootstrap.com/)

* **Server Side:**
    * [NodeJS](http://nodejs.org/)
    * [ExpressJS](http://expressjs.com/)
    * [Jade](http://jade-lang.com/)
    * [Stylus](http://learnboost.github.io/stylus/)
    * [Socket.IO](http://socket.io/)

* **Development & Deployment:**
    * [Grunt](http://gruntjs.com/)
    * [Bower](http://bower.io/)
    * [Travis CI](https://travis-ci.org/)

* **Test:**
    * [Jasmine](http://pivotal.github.io/jasmine/)
    * [Karma](http://karma-runner.github.io/)
    * [Protractor](http://github.com/angular/protractor/)
    * [Selenium](http://www.seleniumhq.org/)
    * [Sauce Lab](http://saucelabs.com/)

## Directory Layout

    client/             --> all of the files to be used in on the client side
      app/                --> angularJS app code
      assets/             --> angularJS-agnostic presentation artifacts 
        font/               --> fonts
        img/                --> image files
        css/                --> css & stylus files 
      vendor/             --> 3rd party client dependencies
    server/             --> all of the files to be used in on the server side
      config/             --> configuration files
        env/                --> env JSON settings
        config.js           --> config
        db.js               --> database settings
        express.js          --> expressJS settings
        routes.js           --> route for serving JSON
      controllers/        --> server controllers
      models/             --> models mapped by mongooseJS
      views/              --> jade templates
    test/               --> application server test code
      config/             --> configuration files for unit, e2e and integration tests
      lib/                --> 3rd party server test dependencies
      e2e/                --> e2e test files
      integration/        --> integration test files      
      unit/               --> unit test files
        client/             --> client unit tests
        server/             --> server unit tests
    package.json        --> for npm    

## Versioning

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit <http://semver.org/>.

## Running App

### Start the Server
* Run the server (the command will automatically opens web browser)

    ```
    node app.js
    ```

* Browse to the application at [http://localhost:3000](http://localhost:3000)

## License

    Copyright (c) 2014 Martin Micunda  

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

