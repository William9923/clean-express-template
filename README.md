## Local-Clean Library 📙
This is the example repository from the MDN tutorial about express js [click here](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website)

Please read the post in order to have a good understanding of the server architecture and expressjs.

This clean architecture is based on my intepretation and my skill (cause I'm still new in Javascript world 😅😅) and only will be used as my own documentation and project template

The API by itself doesn't do anything fancy, it's just a book library CRUD API with some Views to show data. (similar to how the tutorial shows in the post)


## Clean Architecture
The following application template follows Uncle Bob [Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) principles and project structure.

![Clean Architecture Image](https://github.com/William9923/express-boilerplate/blob/master/doc/images/Uncle_Bob_Clean_Architecture.jpg)

## Duck Typing
As javascript cannot use strong typing, this project use what it called duck typing to act similar to how interface work.

In a class-based object-oriented programming language (C++, for example) to make both objects look like a duck you must inherit their classes from a common "interface" class, so the compiler would let you call duck methods on them. That is called a strong typing. 

Now this is how it's done in Javascript:
```javascript
var duck = {  
    appearance: "feathers",  
    quack: function duck_quack(what) {  
        print(what + " quack-quack!");  
    },  
    color: "black"  
};

var someAnimal = {  
    appearance: "feathers",  
    quack: function animal_quack(what) {  
        print(what + " whoof-whoof!");  
    },  
    eyes: "yellow"  
};  

function check(who) {  
    if ((who.appearance == "feathers") && (typeof who.quack == "function")) {  
        who.quack("I look like a duck!\n");  
        return true;  
    }  
    return false;  
}  

check(duck);  // true
check(someAnimal);  // true
```

See, the check function check whether the passed object looks like a duck (it checks appearance and its' ability to quack). We pass two different objects to it and it will return true on both. Besides the appearance and quacking these may be completely different things, but IN THIS PARTICULAR check function they behave the same way (have a common interface), they both look like a "duck". We can call the quack method on both objects (and who cares what they really are).

[reference](https://stackoverflow.com/questions/3379529/duck-typing-in-javascript)

## Project Anatomy

```
express-boilerplate
├───src                                     → Application main source code
│   ├───api                                 → API adapters for express js
│   │   ├───controllers                     → Controller for the API
│   │   ├───errors                          → Error class for application errors
│   │   ├───middlewares                     → Middleware for the express application    
│   │   ├───routes                          → routing for express
│   │   └───validation                      → validation for request body & params for express
│   ├───config                              → Application configuration
│   ├───domain                              → Application Domain Model
│   ├───dto                                 → DTO layer for domain model
│   ├───infrastructure                      → Application infrastructure for dependencies injection
│   │   ├───logger                          → Logging for the application
│   │   ├───orm                             → ORM used for the application to map the domain model to database model
│   │   │   ├───mongoose
│   │   │   │   └───models
│   │   │   └───sequelize
│   │   │       ├───models
│   │   │       └───relation
│   │   ├───repositories                    → Repository for accessing and modify data
│   │   │   ├───moongose
│   │   │   └───sequelize
│   │   ├───serializers                     → Serialize data for response
│   │   └───validation
│   ├───jobs                                → Cron job for application
│   ├───loaders                             → Load application middlewares
│   ├───service                             → Business layer for the application
│   ├───utils                               → Utility Function
│   └───views                               → Templating for views of the application
└───tests                                   → Main dir test case for the application 
    └───services
```

## Application Layer
This Project focus on 3 layers:
- Domain Layer
- Usecase / service layer
- Controller Layer
- Framework / infrastructure layer

## Middleware
Can create custom middleware using this template
Example of custom middleware
- logging middleware : `src\api\middlewares\logger.js`

## Config
Config could be seen as a place to put the utility variables needed by the application. Also as connector for your env variable (for better intellisense in VSCode).
usecase example :
![config usecase example](https://github.com/William9923/express-boilerplate/blob/master/doc/images/config.png)

## Utility
Utility / Shared function for the whole project. Using Singleton Pattern to ease up process as  all the function stored in utility should be a static function.

## Jobs
Cron job directory. This project give 2 example of jobs :
- `populate_mongo.js` : Populate db using mongo db
- `populate_postgres.js` : Populate db for postgresql

## DTO
As this project template is using the Data Transfer Object Design Pattern to seperate the output from the API with the domain object for the business rule, this template provide DTO layer if needed.

## Loaders 
Loaders in this template project is used to seperate the loading process of application middleware from the main file, to each specific loader based on each task. It make the project easier to *maintain* and *replace* with other loader

## Service 
This project template also give a service layer for business application. It make the process easier so you don't need to write all the logic in the Controller. Instead, all the business process should be writen here, and then the service should be injected with the suitable implemerepository

## Tests
Should be used to store unitest for app service (Not Available).

## Scripts
This boilerplate comes with a collection of npm scripts to make your life easier, you'll run them with npm run `script` :
- `seeding` : to seed database (using mongo or postgres sql)
- `dev` : to run in development environment 
- `start` : to run the application 

## The Dependency Rule
> The overriding rule that makes this architecture work is The Dependency Rule. This rule says that source code dependencies can only point inwards. Nothing in an inner circle can know anything at all about something in an outer circle. In particular, the name of something declared in an outer circle must not be mentioned by the code in the an inner circle. That includes, functions, classes. variables, or any other named software entity.

## Special Thanks 
This project cannot be created without the help from these repo:
- [Express Guide MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website)
- [Node Js Clean Architechture Repo](https://github.com/charleston10/api-nodejs-clean-architecture)
- [Bulletproof Node Js Repo](https://github.com/santiq/bulletproof-nodejs)
- [Clean Architecture Hapi Js](https://github.com/jbuget/nodejs-clean-architecture-app)





