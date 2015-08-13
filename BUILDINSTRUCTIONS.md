# Build Instructions
Copyright &copy; 2015 Brady St. John <br />
This program is released under The MIT License (MIT).
Please see the file COPYING in this distribution for
license terms.

##### 1. Download and install necessary components of MeanJS by following the instructions in the [docs](http://meanjs.org/docs.html).
Essentially, you will need:
- Node.js & npm
	- See the [Node.js download page](https://nodejs.org/download/) for more info.
- MongoDB
	- Installation files and instructions for MongoDB can be found on the [MongoDB home page](https://www.mongodb.org/downloads).
- bower
```sh
$ npm install -g bower
```
- Grunt
```sh
$ npm install -g grunt-cli
```



##### 2. Start MongoDB.

```sh
$ mongod
```
##### 3. Install angular-smart-table

```sh
$ bower install angular-smart-table
```
##### 4. Clone the project and deploy it.

```sh
$ git clone [git-repo-url] character-prompt
$ cd character-prompt
$ npm install
$ npm start
```
##### 5. Start the project in the browser by navigating to [http://localhost:3000/#!/](http://localhost:3000/#!/).
##### 6. Sign up and start tracking characters!
