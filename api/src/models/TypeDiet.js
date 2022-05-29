const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {

    sequelize.define('typeDiet',{
        name: {
            type: DataTypes.STRING,
        }
    })
}