const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo 
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title:{
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
    },
    image: {
      // type: DataTypes.STRING(12345),
      type: DataTypes.TEXT,
      defaultValue: 'https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png',
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true, 
    }
  },{
    createdAt: false,
    updatedAt: false
  });
};
