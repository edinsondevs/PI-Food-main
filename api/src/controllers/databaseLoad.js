require("dotenv").config();
const { API_Key3 } = process.env;
const axios = require('axios');
const { TypeDiet } = require('../db.js');

//      CARGO LOS TIPOS DE DIETAS EN LA BASE DE DATOS PARA TENERLOS PRECARGADOS
async function databaseLoad() {
    // let tempdiets = []    
    // recipeApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key4}&number=100&addRecipeInformation=true`);

    // Promise.all([recipeApi])
    // .then((respuesta) => {
    //     const [charApi] = respuesta

    //     let filterdiets = charApi.data.results.map((recipe) => {
    //         for (var i = 0; i < recipe.diets.length; i++) {
    //             var element = recipe.diets[i];    
    //             tempdiets.push(element)
    //         }
    //     })
    //     var unique = [...new Set(tempdiets)];

    //     let arraytempdiets = Array.from(unique)
    //     const tipo = TypeDiet.bulkCreate(arraytempdiets.map(t => ({ title: t })))
    //     console.log('Tabla de Dietas y Tipos Grabadas')
    //     return "ok" 
    // })
    // .catch(error => {
    //     console.log('error: ', error);
    // })
    const typeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key3}&addRecipeInformation=true&number=100`);
    const types = typeApi.data.results.map((e) => e.diets)
    const typesEach = types.map((e) => {
        for (let i = 0; i < e.length; i++) {
            return e[i];
        }
    })
    // console.log(typesEach);
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