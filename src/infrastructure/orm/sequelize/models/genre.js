const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('Genre', {
        genre_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        // attributes
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.VIRTUAL,
            get() {
                return '/catalog/book/' + this._id;
            },
            set() {
                throw new Error('Do not try to set the `url` value!');
            }
        }
    }, {
        // options
        tableName: 'Genres'
    });

};