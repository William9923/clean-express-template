const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    return sequelize.define('Book', {
        book_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        // attributes
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isbn: {
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
        tableName: 'Books'
    });

};
