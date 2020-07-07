const express = require('express');
const db = require('./models');
const routes = require('./routes');
const fileUpload = require('express-fileupload');

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
//allows access to req.files for file uploads
app.use(fileUpload());

app.use('/', routes);

// Sync sequelize models then start Express app
// =============================================
db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`App listening on PORT ${PORT}`);
	});
});
