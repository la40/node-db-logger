# node-db-logger

### Node Database Logger

![GitHub package.json version](https://img.shields.io/github/package-json/v/lachezargrigorov/node-db-logger)
![GitHub](https://img.shields.io/github/license/lachezargrigorov/node-db-logger)
![GitHub All Releases](https://img.shields.io/github/downloads/lachezargrigorov/node-db-logger/total)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/lachezargrigorov/node-db-logger)

A simple database logger. 

- supported databases: MongoDB

All logs are saved into single collection having following structure. 

| property 	| description   	|
|----------	|---------------	|
| time     	| log timestamp 	|
| type     	| log type      	|
| data      | log data      	|

## Installation

`npm install node-db-logger --save`

## How to use

Create logger
- config: configuration object
- identifier: string, not required - will create a reusable logger if set

```javascript
const logger = require('node-db-logger').createLogger({
  // config 
  mongo: {
    url     : 'mongodb://localhost:27017',
    options : {
      useUnifiedTopology: true
    },
    database: 'demo',
    collection: 'demoLogs'
  }
})

// create reusable logger
require('node-db-logger').createLogger({
  // config 
  mongo: {
    url     : 'mongodb://localhost:27017',
    options : {
      useUnifiedTopology: true
    },
    database: 'demo',
    collection: 'demoLogs'
  }
},'identifier') 

// use it everywhere
const reusableLogger = require('node-db-logger').createLogger('identifier')
```
 
### record(type, ...data)

Create a log record

- type: the value of this parameter will go into the type field of the document
- data: data to be records   

```javascript
const test = 'test'
logger.record('info', 'some ', test, ' string')
logger.record('error', 1)
logger.record('warn', true)
logger.record('debug', {test: 'test'})
logger.record('trace', [1, 2, 3])
logger.record('ClassName::lineNumber or something else', [1, 2, 3], [4, 5, 6], [7, 8, 9])  
```  

### delete(...types)

Delete log records

- types: types to be deleted, will delete all if types not set

```javascript
// Delete all records
logger.delete() 

// Delete all records of "some type" and "error" 
const type = "some type" 
logger.delete(type, 'error')
```             

## Config

| config           	| required 	| default 	| description     	|
|------------------	|----------	|---------	|-----------------	|
| mongo.url        	| true     	|         	| Connection url  	|
| mongo.options    	| false    	| {}      	| [Mongo Options](https://mongodb.github.io/node-mongodb-native/3.2/api/MongoClient.html)                	|
| mongo.database   	| true     	|         	| Database name   	|
| mongo.collection 	| false    	| logs    	| Collection name 	|   
