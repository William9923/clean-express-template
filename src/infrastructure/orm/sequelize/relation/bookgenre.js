module.exports = (sequelize, DataTypes) => {

    return sequelize.define('grant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        selfGranted: DataTypes.BOOLEAN
    }, {
        timestamps: false,
        tableName: 'BooksGenres'
    });

};
