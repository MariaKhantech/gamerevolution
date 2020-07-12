module.exports = (sequelize, DataTypes) => {
	const Friend = sequelize.define('Friend', {
		friend_id: DataTypes.INTEGER
	});

	Friend.associate = (models) => {
		Friend.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'userId' });
	};

	return Friend;
};
