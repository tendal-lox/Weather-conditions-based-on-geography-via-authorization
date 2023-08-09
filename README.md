# Weather conditions based on geography via authorization

![N|Solid](https://www.visualcrossing.com/images/weather-api/hero-image.png)

## Summary of what this module does!
>> Note: A documentation for this module is provided by swagger.

Sample list of users will receive from https://jsonplaceholder.typicode.com/users.
An array of users data will receive by get request to `localhost:3000/insertOldMembers`.

Our database has a table called all members and it contains name, username and email.

### _Authentication_
In `localhost:3000/signIn` route you can enter your name, username and email address to signIn or signUp. If these properties do not match any record in the database, a new record is created for this user.

After this step, an email will be sent to you that contains a login link.(In this version it will appear in your terminal.)

By requesting to the sent link, you will go to the `localhost:3000/verify`. If verification of token, successfully passed, you can see this massage: `welcome 'your username' with userId: 'your userId'`

### _User's Weather Conditions_
Now you can access to your climate status by get request to `localhost:3000/weatherStatus`.

There are two apis here, one of them will get your IP address and the other will get your weather status via IP address.

### _Log Out_
you can also log out of your account with this path: `localhost:3000/logout`.

>> I used session to manage logIn & logOut feature.

## DataBase Features
- Duplicate data is not stored in the dataBase
- Each query handle by pool connection
- Using the mysql module as a mysql node.js driver

## Web Server Features
- Using express as a web server
- I used pino logging instead of console.log

### AXIOS as a default API call module
The default timeout for each request is 900 milliseconds. If no response is received within this time, axios will resend the request a second time.

>> This operation is done up to 6 times. The interval between each failed request is 2000 milliseconds. After 5 times it will reject response promise.

### Additional features
- Using nodmailer module as a mail sender
- Using json web token to generate verification token
- Using session to detect user's verification for each request to private routes

## Install Guide
This module requires [Node.js](https://nodejs.org/) v16+ to run.
At first, you have to implement dataBase table.

```sh
git clone https://github.com/tendal-lox/Weather-conditions-based-on-geography-via-authorization.git
cd user-data-management-via-mysql-and-email-authentication
npm i
npm start
```

## API Documentation
```
https://localhost:3000/docs
```

### TECH

- [Node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [Mysql] - SQL dataBase
- [Axios] - great UI boilerplate for modern web apps
- [Async.js]
- jsonwebtoken
- express-session
- nodemailer - as a mail sender
- dotenv
- Nodemon
- pino
- swagger

## License
ISC

   [Node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [PostgreSQL]: <https://www.postgresql.org/>
   [Axios]: <https://axios-http.com/>
   [Async.js]: <http://caolan.github.io/async/v3/>