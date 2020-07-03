module.exports = (sequelize, DataTypes) => {
    const Favorites = sequelize.define('Favorites', {
        favorites: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

        non_favorites: DataTypes.BOOLEAN,



        currently_playing: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return Favorites;
};
