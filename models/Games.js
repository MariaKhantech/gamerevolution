module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        game_name: DataTypes.STRING,
        unique_id: DataTypes.INTEGER,
    });
    return Game;

    Game.associate = (models) => {
        Game.belongsTo(models.User, { foreignKey: "userId", targetKey: "userId" });
    }

};







