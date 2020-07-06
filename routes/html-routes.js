const path = require('path');
const router = require('express').Router();

//require isAuthen for login check
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

//send html requests for /profile to profile.html
router.get('/profile', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/profile.html'));
});

// Place this route below all others to send he index.html file
// to any request that is not explicitly defined above
router.get('/addgame', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/addgame.html'));
});

//route for user when logging in, if exists, send to profile page
//if does not exist, send to sign up page
router.get("/", (req, res) => {
	if (req.user) {
		res.redirect("/profile");
	}
	res.sendFile(path.join(__dirname, "../public/signUp.html"));
});

//login & send to profile page
router.get("/login", (req, res) => {
	if (req.user) {
		res.redirect("/profile");
	}
	res.sendFile(path.join(__dirname, "../public/profile.html"));
});

//link authenticated
//will redirect to sign up page if user clicks Profile link
router.get("/members", isAuthenticated, (req, res) => {
	res.sendFile(path.join(__dirname, "../public/profile.html"));
})


module.exports = router;
