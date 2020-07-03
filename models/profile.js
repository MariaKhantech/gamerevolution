//creates the profile table//
module.exports = (sequelize, DataTypes) => {
	const Profile = sequelize.define('Profile', {
		profileName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		bio: {
			type: DataTypes.STRING,
			allowNull: true
		},
		discordUrl: {
			type: DataTypes.STRING,
			allowNull: true
		},
		twitchUrl: {
			type: DataTypes.STRING,
			allowNull: true
		},
		youtubeUrl: {
			type: DataTypes.STRING,
			allowNull: true
		},
		nickname: {
			type: DataTypes.STRING,
			allowNull: true
		},
		discordUserName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		twitchUserName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		aboutMe: {
			type: DataTypes.STRING,
			allowNull: false
		},
		coverImg: {
			type: DataTypes.STRING,
			allowNull: true
		},
		avatarImg: {
			type: DataTypes.STRING,
			allowNull: true
		}
	});
	//this will add user id into profile
	Profile.associate = (models) => {
		Profile.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'userId' });
	};

	return Profile;
};
