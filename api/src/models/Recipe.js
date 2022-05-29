const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    aggregateLikes:{
      type: DataTypes.INTEGER
    },
    healthScore:{
      type: DataTypes.FLOAT,
    },
    instructions: {
      type: DataTypes.STRING,
    }
  });
};

/**
El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterisco deben ser obligatorias):

ID: *
Nombre * :    name
Resumen del plato * :   summary 
Puntuación :        aggregateLikes
Nivel de "comida saludable" :  healthScore
Paso a paso :     instructions

 */