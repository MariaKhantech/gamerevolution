module.exports = (sequelize, DataTypes) => {
	const Comments = sequelize.define('Comments', {
		comments: DataTypes.STRING
	});
	//this will add user id into profile
	Comments.associate = (models) => {
		Comments.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'userId' });
	};
	return Comments;
};
