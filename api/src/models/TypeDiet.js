const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {

    sequelize.define('typeDiet',{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}