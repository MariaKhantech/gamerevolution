const express = require('express');
const db = require('./models');
const routes = require('./routes');
const fileUpload = require('express-fileupload');
var session = require('express-session');
// Requiring passport as we've configured it
var passport = require('./config/passport');

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
//allows access to req.files for file uploads
app.use(fileUpload());

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'gamer cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

// Sync sequelize models then start Express app
// =============================================
db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`App listening on PORT ${PORT}`);
	});
});
