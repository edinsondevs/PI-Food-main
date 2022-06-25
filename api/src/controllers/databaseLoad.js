require("dotenv").config();
const { API_Key3 } = process.env;
const axios = require('axios');
const { TypeDiet } = require('../db.js');

//      CARGO LOS TIPOS DE DIETAS EN LA BASE DE DATOS PARA TENERLOS PRECARGADOS
async function databaseLoad() {

    const typeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key3}&addRecipeInformation=true&number=100`);
    const types = typeApi.data.results.map((e) => e.diets)
    const typesEach = types.map((e) => {
        for (let i = 0; i < e.length; i++) {
            return e[i];
        }
    })
    //    CONSULTO LA BD CON LOS TYPES DE DIETAS Y SI NO EXISTEN LOS CREO  
    typesEach.forEach(e => {
        TypeDiet.findOrCreate({
            where: { title: e }
        })
            .then(e => e)
            .catch(e => e)
    })
    //    CONSULTO LA BD CON LOS TYPES DE DIETAS Y LOS MANDO COMO RESPUESTA
    const allTypes = await TypeDiet.findAll({
        attributes: ["title"]
    });
    // const allTypes = await Recipe.findAll();
    const newDiets = allTypes.map((e) => e.title)
    // console.log(allTypes)
    console.log('Tabla de Dietas y Tipos Grabadas ')
    console.log(newDiets)
}

module.exports = databaseLoad;