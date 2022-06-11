# Videos Importantes a Ver
https://www.students.soyhenry.com/classes/46

https://www.students.soyhenry.com/classes/46?cohortId=30

https://www.students.soyhenry.com/classes/46?cohortId=31

## Api Key del Proyecto Food
edinsonmadrid@gm
API_Key: ef244a0754514ed2ac01df73f538144e

e_madrid@hot
API Key: 8596b1d800864c57a3175cbf1dce4bb4

edinsonmadrid@hot
API Key: f55675efd94440d29172e34f9afb5760

## __Url permitidas para el proyecto__
https://api.spoonacular.com/recipes/complexSearch

https://api.spoonacular.com/recipes/{id}/information

https://api.spoonacular.com/recipes/complexSearch?apiKey=ef244a0754514ed2ac01df73f538144e&number=1000

https://api.spoonacular.com/recipes/{id}/information?apiKey=ef244a0754514ed2ac01df73f538144e










dogs?.filter((b) => b.name.toLowerCase().includes(input.toLowerCase()))



const axios = require('axios')
const {Temperament} = require('../db')
const {API_KEY} = process.env;

async function databaseLoader(){
    const races = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    let array = races.map(e => e.temperament).toString().split(/\s*,\s*/) // regular expression para hacer split de espacios y comas
    let final = [...new Set(array)] // hago un set para quitar duplicados y lo encierro con [] para hacerlo un array