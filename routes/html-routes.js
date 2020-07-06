const path = require('path');
const router = require('express').Router();

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

module.exports = router;
