const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Place this route below all others to send he index.html file
// to any request that is not explicitly defined above
router.get('/addgame', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/addGame.html'));
});

module.exports = router;
