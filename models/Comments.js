module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        uuid: {
            type: DataTypes.UUID,

            primaryKey: true
        },
        comments: DataTypes.STRING
    });
    return Comments;
};
