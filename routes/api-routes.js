const db = require('../models');
const passport = require("../config/passport");


const router = require('express').Router();

router.get('/', (req, res) => res.json('Sample API get endpoint'));

//testing one to one between user and profile -maria
// db.User
// 	.create({
// 		firstName: 'Uzi',
// 		lastName: 'Khan',
// 		userName: 'U2ThaZ',
// 		password: 'masked',
// 		email: 'maria@gmail.com'
// 	})
// 	.then((user) => {
// 		console.log(user.get());
// 	});

//testing for creating the database in profiles -maria
// db.Profile.create({
// 	profileName: 'Gamer Chick',
// 	bio: 'I am loving the new Ninjala game on switch!',
// 	discordUrl: 'www.discordurl.com',
// 	twitchUrl: 'www.twitchuserurl.com',
// 	youtubeUrl: 'www.youtube.com',
// 	nickname: 'bestgamergirl',
// 	discordUserName: 'GamerChick#4444',
// 	twitchUserName: 'BossChickgamer23',
// 	aboutMe: 'I have played for 10 years and will die gaming.',
// 	coverImg: '/asssets/img/image1.png',
// 	avatarImg: '/assets/imv/avatarimg.png'
// });

// Using Game Model to insert new row into Games table in database
router.post('/addgames', (req, res) => {
	db.Game
		.create({
			game_name: req.body.game_name,
			unique_id: req.body.unique_id
		})
		.then((result) => {
			console.log(`Added game successfully`);
			res.json(result);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Passport Routes








module.exports = router;
