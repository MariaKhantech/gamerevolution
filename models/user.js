//for authentication

//create new user
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		username: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		//This is the PRIMARYKEY for the users table, name changed to userId by setting PRIMARYKEY to true//
		userId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		}
	});
	return User;
};
