# GamerEvolution

![badge](https://img.shields.io/badge/license-MIT-blue.svg)  ![badge](https://img.shields.io/badge/JavaScript-51%25-yellow) ![badge](https://img.shields.io/badge/HTML-32%25-red) ![badge](https://img.shields.io/badge/CSS-17%25-9cf) ![badeg](https://img.shields.io/github/repo-size/MariaKhantech/gamerevolution)

## Heroku URL
https://fatidique-moliere-24500.herokuapp.com/index.html

## Table of Contents
* [General Information](#general-information)
* [App Preview](#app-preview)
* [How it Works](#how-it-works)
* [Technologies](technologies)
* [Local Installation](#local-installation)
* [License](#license)
* [Authors and Contributors](#authors-and-contributors)

## General Information
GamerEvolution is a full-stack web application to serve as a one-stop-shop for gamers and all things video game.  This application allows users to create a unique profile and build a social environment for gamers.  As well as search, save, read, and share data about video games new and old.  
## App Preview

![app-gif](https://media.giphy.com/media/H3kNSXbWndbAH9EjmO/giphy.gif)
## How it Works

When a user presses the "Login" button at the top right of the navbar on the landing page, they are to select "Sign Up" and they will be directed to a sign up form where they are to create a unique profile by entering the following information:
* First name
* Last name
* User name
* Email address
* Password

Once a user has signed up they will then be directed to their newly created profile where they can enter information about who they are as gamers such as personal favorite (and least favorite) games, Twitch/YouTube/Discord information. A user's profile page also can store and display chart data concerning what their tastes are as a player.

Once a user has setup their profile, they can begin to search for games to add to their personal game library by selecting the "Game Search" item on the navbar.

They Game Search feature allows a user to search for multiple and specific games using data from the RAWG Video Game Database API.  Using the  game search feature a user can select a platform, enter a year, and select an ordering of results or enter the title of the game they are looking for.  Based on a user's inputs a grid of games  will be rendered to a user displaying some general information about the game, such as image/video preview, release year, RAWG critic rating, and the number of user reviews.  A user can also look at data in the from of charts by selecting the "Top Game Charts" button.  These charts provide a user more details about the most popular games of the year for platforms and rating breakdowns for specific game titles.

When a user finds a game they want to add to their personal library they are to select the "Add to Library" button found at the bottom of a game card. The user can then look at their game library found on their profile, and when they would like to remove a game from their library, they can select the "Remove from Library" button and it will be removed.

If a user knows another user's username they can use the "Profile Search" feature found on the navbar under "Search". Here a user can find other user's profiles and add them as friends. A user can also find general instruction and information regarding the application and all of it's key features on the "About" page. 


## Technologies

### Main Languages

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - This application is written and programmed using ES6 JavaScript.

* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Used to style the html elements/application.

* [HMTL5](https://developer.mozilla.org/en-US/docs/Web/HTML) - Used to give frontend html files their structure and DOM elements.

### Front-End Technologies

* [jQuery](https://jquery.com/) -  Used to simplify JavaScript code, DOM access/manipulation, and API requests.

* [Bootstrap](https://getbootstrap.com/) - Grid/Column system used to create responsive page layout/structure.  Also used to create and style several elements such as buttons, modals, carousels, etc.

* [jarallax.js](http://www.jarallax.com/) - Javascript library used to create parallax scrolling effect on landing page.

* [three.js](https://threejs.org/) - Library used to create and animate smoke effect on application's landing page.

* [chart.js](https://www.chartjs.org/) - Featured on "Profile" and "Game Search" pages and used to create and display charts and chart data.

* [bootdey](https://www.bootdey.com/) - Resource that features components using bootstrap.  Used to create and style certain elements on "Profile" page.

* [animate.css](https://animate.style/) - Used on application's landing page to add animation features to certain elements.

* [Rate Yo!](https://rateyo.fundoocode.ninja/) - Plugin used to render 5-star rating on video game cards.

### Back-End Technologies

* [Node.js](https://nodejs.org/en/about/) - Used to execute code for application on backend.

* [MySQL Workbench](https://www.mysql.com/products/workbench/) - MySQL GUI used to architect, test, and manage MySQL database.

* [Express](https://expressjs.com/) - Used to route and build RESTful API and make requests/responses between database and client.

* [Sequelize](https://sequelize.org/) - ORM library used to connect/interact with mySQL database and execute SQL queries.

* [Passport](http://www.passportjs.org/) - Node middleware used to setup and support the application's authentication system. 

* [Dotenv](https://www.npmjs.com/package/dotenv) - Module to load variables in `.env` file.

* [Multer](https://www.npmjs.com/package/multer) - Middleware used to handle a user's profile form data and file uploading. 

### Other Technologies/Resources

* [RAWG Video Game Database API](https://api.rawg.io/docs/) - Used to retrieve all platform and video game data found on the "Game Search" and "Profile" pages.
* [Heroku](https://www.heroku.com/) - Used to host working application. (see app link above).

#### Image Resources

 * [pngitem.com](https://www.pngitem.com/)
 * [Final Fantasy Image](https://wallup.net/wp-content/uploads/2018/03/19/591427-Final_Fantasy_XIV_A_Realm_Reborn-fantasy_art-748x665.jpg)
 * [Unsplash.com](https://unsplash.com/)


## Local Installation
 After a user clones the repository, they will need to install the NPM packages associated with the application by running `npm install`. 

 The user will then need to initialize the application's database by first editing the `config.js`/`.env` files to match their local environment information, followed by running the `sequelize db:create` command in their terminal.

Finally, a user can launch the application by running `node server.js` in their terminal, and access the application at ```http://localhost:8080```
## License

MIT License

Copyright (c) 2020 Maria Khan, Caleb Welch, Shannon Trainor, Gus Heptig

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Authors and Contributors

* **[Maria Khan](https://github.com/MariaKhantech)**
* **[Caleb Welch](https://github.com/calebwelch1)**
* **[Shannon Trainor](https://github.com/shannontrainor)**
* **[Gus Heptig](https://github.com/gheptig)** 