const db = require('../models');
const passport = require("../config/passport");
const { response } = require('express');

const router = require('express').Router();

router.get('/', (req, res) => res.json('Sample API get endpoint'));
//==================== Maria =====================//

// //testing one to one between user and profile -maria
// db.User
// .create({
// 	firstName: 'Maria',
// 	lastName: 'Khan',
// 	userName: 'U2ThaZ4',
// 	password: 'masked',
// 	email: 'mariag@gmail.com'
// })
// .then((user) => {
// 	console.log(user.get());
// });

// //testing for creating the database in profiles -maria
// db.Profile.create({
// 	profileName: 'Gamer Chick',
// 	bio: 'I am loving the new Ninjala game on switch!',
// 	favoriteYoutubeVideoUrl: 'https://www.youtube.com/embed/snjhDUQktMs',
// 	twitchUrl: 'www.twitchuserurl.com',
// 	youtubeChannelUrl: 'https://www.youtube.com/channel/UC8pGicAcTKSJNf_70gC7m8w',
// 	nickname: 'bestgamergirl',
// 	discordUserName: 'GamerChick#4444',
// 	twitchUserName: 'BossChickgamer23',
// 	aboutMe: 'I have played for 10 years and will die gaming.',
// 	coverImg: '/asssets/img/image1.png',
// 	avatarImg: '/assets/imv/avatarimg.png',
// 	userId: 1
// });

//connects to the database to retrieve one profile using the user ID
router.get('/profile:id', (req, res) => {
	db.Profile
		.findOne({
			where: {
				userId: req.params.id
			}
		})
		.then((dbUserProfile) => {
			res.json(dbUserProfile);
		});
});

//Creates a profile in the database 
router.post('/profile/create', (req, res) => {
	console.log(req.body);
	db.Profile
		.create({
			profileName: req.body.profileName,
			bio: req.body.profileBio,
			favoriteYoutubeVideoUrl: req.body.favoriteYoutubeVideoUrl,
			twitchUrl: req.body.twitch_icon_url,
			youtubeChannelUrl: req.body.youtube_icon_url,
			nickname: req.body.nickname,
			discordUserName: req.body.discordUserName,
			twitchUserName: req.body.twitchUserName,
			aboutMe: req.body.aboutMe,
			userId: 1
		})
		.then((result) => {
			console.log(`Posted data successfully`);
			res.json(result);
		})
		.catch((err) => {
			res.json(err);
		});
});

//route to update a users profile
router.put('/profile/update:id', (req, res) => {
	db.Profile
		.update(
			{
				profileName: req.body.profileName,
				bio: req.body.profileBio,
				favoriteYoutubeVideoUrl: req.body.favoriteYoutubeVideoUrl,
				twitchUrl: req.body.twitch_icon_url,
				youtubeChannelUrl: req.body.youtube_icon_url,
				nickname: req.body.nickname,
				discordUserName: req.body.discordUserName,
				twitchUserName: req.body.twitchUserName,
				aboutMe: req.body.aboutMe
			},
			{
				where: {
					// userId: 1
					userId: req.params.id
				}
			}
		)
		.then(function (dbPost) {
			res.json(dbPost);
		});
});

//==================Gus============//

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

router.get('/addgames', (req, res) => {
	db.Game.findAll().then((result) => {
		res.json(result);
	})
});

//Passport Routes

//login route

router.post("/api/login", passport.authenticate("local"), (req, res) => {
	res.json(req.user)
	// {
	// 	// email: req.user.email,
	// 	// id: req.user.id
	// });
});

//logout & redirect to home page
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

//signup route, then redirect to home page
router.post("/api/signUp", (req, res) => {
	db.User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	}).then(() => {
		res.redirect("/api/profile");
	}).catch(err => {
		res.status(401).json(err);
	});
});

//get user data
router.get("/api/user-data", (req, res) => {
	if (!req.user) {
		res.json({});		//empty object if user not logged in
	} else {
		res.json({
			email: req.user.email,
			id: req.user.id
		});
	}
});



module.exports = router;
