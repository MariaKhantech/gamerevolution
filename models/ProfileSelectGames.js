//creates the profile table//
module.exports = (sequelize, DataTypes) => {
	const ProfileSelectGames = sequelize.define('ProfileSelectGames', {
		currentlyPlaying: {
			type: DataTypes.STRING,
			allowNull: true
		},
		favoriteGameOne: {
			type: DataTypes.STRING,
			allowNull: true
		},
		favoriteGameTwo: {
			type: DataTypes.STRING,
			allowNull: true
		},
		favoriteGameThree: {
			type: DataTypes.STRING,
			allowNull: true
		},
		leastFavoriteOne: {
			type: DataTypes.STRING,
			allowNull: true
		},
		leastFavoriteTwo: {
			type: DataTypes.STRING,
			allowNull: true
		},
		leastFavoriteThree: {
			type: DataTypes.STRING,
			allowNull: true
		}
	});
	//this will add user id into ProfileSelectGames
	ProfileSelectGames.associate = (models) => {
		ProfileSelectGames.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'userId' });
	};

	return ProfileSelectGames;
};
