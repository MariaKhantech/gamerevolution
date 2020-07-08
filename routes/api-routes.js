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
			//res.redirect('/profile?userId=2');
		});
});

//Creates a profile in the database --Maria
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
			coverImg: null,
			avatarImg: 'public/assets/images/public-images/default-image.png',
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

//route to update a users profile -- Maria
router.put('/profile/update:id', (req, res) => {
	console.log(req.files, req.body);
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

//route to update the avatar profile image
router.post('/profile/upload_avatar', (req, res) => {
	const image = req.files.file;
	const destination = 'public/assets/images/profile-images/' + image.name;
	console.log(image, destination);
	//move the image to assets/images/
	image.mv(destination, (error) => {
		if (error) {
			console.error(error);
			res.writeHead(500, { 'Content-Type': 'application/json' });
			res.send(JSON.stringify({ status: 'error', message: error }));
			return;
		}

		db.Profile
			.update(
				{
					avatarImg: destination
				},
				{
					where: {
						userId: 2
						//userId: req.params.id
					}
				}
			)
			.then(function (dbPost) {
				res.json(dbPost);
			});

		console.log(`Posted data successfully`);
	});
});

//route to update the cover img profile image
router.post('/profile/upload_coverImg', (req, res) => {
	const image = req.files.file;
	const destination = 'public/assets/images/profile-images/' + image.name;
	console.log(image, destination);
	//move the image to assets/images/
	image.mv(destination, (error) => {
		if (error) {
			console.error(error);
			res.writeHead(500, { 'Content-Type': 'application/json' });
			res.send(JSON.stringify({ status: 'error', message: error }));
			return;
		}

		db.Profile
			.update(
				{
					coverImg: destination
				},
				{
					where: {
						userId: 2
						//userId: req.params.id
					}
				}
			)
			.then(function (dbPost) {
				res.json(dbPost);
			});

		console.log(`Posted data successfully`);
	});
});

//=====================Api routes for favorite profile games ================== MARIA

//Get information from the database
router.get('/profile/selectedgames:id', (req, res) => {
	db.ProfileSelectGames
		.findOne({
			where: {
				userId: req.params.id
			}
		})
		.then((dbUserGames) => {
			res.json(dbUserGames);
		});
});

//Creates information from the database
router.post('/profile/selectedgames', (req, res) => {
	console.log(req.body);
	db.ProfileSelectGames
		.create({
			currentlyPlaying: req.body.currentlyPlaying,
			favoriteGameOne: req.body.favoriteGameOne,
			favoriteGameTwo: req.body.favoriteGameTwo,
			favoriteGameThree: req.body.favoriteGameThree,
			leastFavoriteOne: req.body.leastFavoriteOne,
			leastFavoriteTwo: req.body.leastFavoriteTwo,
			leastFavoriteThree: req.body.leastFavoriteThree,
			userId: 2
		})
		.then((result) => {
			console.log(`Posted data successfully`);
			res.json(result);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Updates the information from the database
router.put('/profile/selectedgames/update:id', (req, res) => {
	db.ProfileSelectGames
		.update(
			{
				currentlyPlaying: req.body.currentlyPlaying,
				favoriteGameOne: req.body.favoriteGameOne,
				favoriteGameTwo: req.body.favoriteGameTwo,
				favoriteGameThree: req.body.favoriteGameThree,
				leastFavoriteOne: req.body.leastFavoriteOne,
				leastFavoriteTwo: req.body.leastFavoriteTwo,
				leastFavoriteThree: req.body.leastFavoriteThree
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
//================= ENDS MARIA================//
//==================Gus============//


router.get('/addgames:id', (req, res) => {
	db.Game
		.findAll({
			where: {
				userId: req.params.id
			}
		})
		.then((result) => {
			res.json(result);
			console.log(result);
		});
});

router.post('/addgames', (req, res) => {
	db.Game
		.create({
			game_name: req.body.game_name,
			unique_id: req.body.unique_id,
			userId: 1
		})
		.then((result) => {
			console.log(`Added game successfully`);
			res.json(result);
		})
		.catch((err) => {
			res.json(err);
		});
});





//======================Shannon=======================//

//Passport Routes

//login route

router.post("/login", passport.authenticate("local"), (req, res) => {
	res.json(
		{
			email: req.User.email,
			id: req.User.id
		});
});

//logout & redirect to home page
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

//signup route, then redirect to home page
router.post("/signup", (req, res) => {
	console.log(req.body);
	db.User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password

	}).then(() => {
		res.redirect(307, "/login");
	}).catch(err => {
		res.status(401).json(err);
	});
});

//get user data
router.get("/user-data", (req, res) => {



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
