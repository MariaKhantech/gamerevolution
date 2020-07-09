const db = require('../models');
const passport = require('../config/passport');
const router = require('express').Router();

//==================== Maria =====================//

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

//

//Creates a profile in the database --Maria
router.post('/profile/create', (req, res) => {
	console.log(req.user);
	db.Profile
		.create({
			profileName: 'ProfileName',
			bio: 'Fill out your bio',
			favoriteYoutubeVideoUrl: req.body.favoriteYoutubeVideoUrl,
			twitchUrl: req.body.twitch_icon_url,
			youtubeChannelUrl: req.body.youtube_icon_url,
			nickname: req.body.nickname,
			discordUserName: req.body.discordUserName,
			twitchUserName: req.body.twitchUserName,
			aboutMe: req.body.aboutMe,
			coverImg: null,
			avatarImg: 'public/assets/images/profile-images/default-image.png',
			userId: req.user.userId
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
	console.log('HELLO');
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
	console.log(req);
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
						userId: req.user.userId
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
	//console.log(req.body);
	db.ProfileSelectGames
		.create({
			currentlyPlaying: req.body.currentlyPlaying,
			favoriteGameOne: req.body.favoriteGameOne,
			favoriteGameTwo: req.body.favoriteGameTwo,
			favoriteGameThree: req.body.favoriteGameThree,
			leastFavoriteOne: req.body.leastFavoriteOne,
			leastFavoriteTwo: req.body.leastFavoriteTwo,
			leastFavoriteThree: req.body.leastFavoriteThree,
			userId: req.user.userId
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

//creates a user comment //
router.post('/profile/comment', (req, res) => {
	console.log(req.body);
	db.Comments
		.create({
			comments: req.body.comment,
			userId: req.user.userId
		})
		.then((result) => {
			console.log(`Posted data successfully`);
			res.json(result);
		})
		.catch((err) => {
			res.json(err);
		});
});

//gets a user comment
router.get('/profile/comment:id', (req, res) => {
	db.Comments
		.findAll({
			where: {
				userId: req.params.id
			},
			order: [ [ 'createdAt', 'DESC' ] ],
			limit: 5
		})
		.then((dbUserComments) => {
			res.json(dbUserComments);
			//res.redirect('/profile?userId=2');
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
		})
		.catch((err) => {
			res.json(err);
		});
});

router.post('/addgames', (req, res) => {
	db.Game
		.create({
			game_name: req.body.game_name,
			unique_id: req.body.unique_id,
			userId: req.user.userId

		})
		.then((result) => {
			console.log(`Added game successfully`);
			res.json(result);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.delete('/addgames:id', (req, res) => {
	db.Game
		.destroy({
			where: {
				game_name: req.body.game_name,
				userId: req.user.userId
			}
		})
		.then((result) => {
			console.log(`Deleted game successfully`);
			res.json(result);
		})
		.catch((err) => {
			res.json(err);
		});
});

//======================Shannon=======================//
//===================Passport Routes==================//
//====================================================//
//login route
router.post('/login', passport.authenticate('local'), (req, res) => {
	res.json({
		email: req.user.email,
		id: req.user.userId
	});
});

//logout & redirect to home page (TODO)
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

//signup route, then redirect to home page
router.post('/signup', (req, res) => {
	console.log(req.body);
	db.User
		.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		})
		.then(() => {
			res.redirect(307, '/api/login');
		})
		.catch((err) => {
			res.status(401).json(err);
		});
});

//get user data
router.get('/user-data', (req, res) => {
	console.log('Get user data');
	if (!req.user) {
		res.json({}); //empty object if user not logged in
	} else {
		res.json({
			email: req.user.email,
			userId: req.user.userId,
			username: req.user.username
		});
	}
});

module.exports = router;
