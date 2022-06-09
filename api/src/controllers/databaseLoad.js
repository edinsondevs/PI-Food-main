require("dotenv").config();
const { API_Key2 } = process.env;
const axios = require('axios');
const { TypeDiet } = require('../db.js');

//      CARGO LOS TIPOS DE DIETAS EN LA BASE DE DATOS PARA TENERLOS PRECARGADOS
async function databaseLoad() {
    let tempdiets = []    
    recipeApi = axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_Key2}&number=5&addRecipeInformation=true`);
        
    Promise.all([recipeApi])
    .then((respuesta) => {
        const [charApi] = respuesta

        let filterdiets = charApi.data.results.map((recipe) => {
            for (var i = 0; i < recipe.diets.length; i++) {
                var element = recipe.diets[i];    
                tempdiets.push(element)
            }
        })
        var unique = [...new Set(tempdiets)];

        let arraytempdiets = Array.from(unique)
        const tipo = TypeDiet.bulkCreate(arraytempdiets.map(t => ({ name: t })))
        console.log('Tabla de Dietas y Tipos Grabadas')
        return "ok" 
    })
    .catch(error => {
        console.log('error: ', error);
    })
}
 
module.exports = databaseLoad;