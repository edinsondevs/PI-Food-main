require("dotenv").config();
const { Router, response } = require("express");
const axios = require("axios");
const { Recipe, TypeDiet } = require("../db.js");

const { API_temp } = process.env; //    CAMBIAR EN TODOS LOS FETCH EL NOMBRE HASTA API_temp  si se bloquea la API por consultas
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);[]

//************************************************************************************************************************************************************************************ */
//                                                                  CONSULTAS PRINCIPALES
//************************************************************************************************************************************************************************************ */
//************************************            CONSULTA A LA API
const getApi = async () => {
  const api = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_temp}&addRecipeInformation=true&number=100`
  );
  // const  api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=7975980691ef48ff83507b262e3c6d47&number=2&addRecipeInformation=true`)
  const apiInfo = api.data.results.map((e) => {
    return {
      id: e.id,
      image: e.image,
      title: e.title,
      vegetarian: e.vegetarian,
      vegan: e.vegan,
      glutenFree: e.glutenFree,
      dietas: e.diets,
    };
  });
  return apiInfo;
};
// //***************************************       CARGO LA BD CON LOS TYPES DE DIETAS
// async function loadDb() {
//   const GlutenFree = await TypeDiet.findOrCreate({where: {name: 'gluten free'}});
//   const Vegetarian = await TypeDiet.findOrCreate({where: {name: 'vegetarian'}});
//   const Ketogenic = await TypeDiet.findOrCreate({where: {name: 'ketogenic'}});
//   const DairyFree = await TypeDiet.findOrCreate({where: {name: 'dairy free'}});
//   const Vegan = await TypeDiet.findOrCreate({where: {name: 'vegan'}});
//   const Pescetarian = await TypeDiet.findOrCreate({where: {name: 'pescetarian'}});
//   const LactoVegetarian = await TypeDiet.findOrCreate({where: {name: 'lacto vegetarian'}});
//   const OvoVegetarian = await TypeDiet.findOrCreate({where: {name: 'ovo vegetarian'}});
//   const Paleo = await TypeDiet.findOrCreate({where: {name: 'paleo'}});
//   const Primal = await TypeDiet.findOrCreate({where: {name: 'primal'}});
//   const Lowfodmap = await TypeDiet.findOrCreate({where: {name: 'low fodmap'}});
//   const Whole30 = await TypeDiet.findOrCreate({where: {name: 'whole30'}});
//   }



//***************************************       CONSULTA A LA BD
const getDb = async () => {
  return await Recipe.findAll({
    include: {
      model: TypeDiet,
      attributes: ["name"],
      througth: {
        attributes: [],
      },
    },
  });
};

const getAllDiets = async () => {
  const getApiInfo = await getApi();
  const getDbInfo = await getDb();
  const infoTotal = getApiInfo.concat(getDbInfo);
  return infoTotal;
};

//************************************************************************************************************************************************************************************ */
//                                                                  GET
//******************            PRUEBA                              ********************** */

router.get("/prueba", async (req, res, next) => {
  // const printPrueba = []
  try {
    let prueba = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_temp}&number=2&addRecipeInformation=true`
      //`https://nutritionix-api.p.rapidapi.com/v1_1/search/cheddar%20cheese&X-RapidAPI-Key=135849fecfmsh0f019d564259576p172a81jsnea91d0f9816b`
    );
    const prueba2 = await prueba.data.results.map((e) => {
      return {
        id: e.id,
        image: e.image,
        title: e.title,
        vegetarian: e.vegetarian,
        vegan: e.vegan,
        glutenFree: e.glutenFree,
        dietas: e.diets,
      };
    });
    res.send(prueba2);
    return prueba2;
  } catch (error) {
    next();
  }
});

//*************************************           GET TYPES PENDIENTE **************************** */
//    EXTRAE SOLO LOS DATOS NECESARIOS//************************************************************************************************************************************************************************************ */
// Obtener TODOS los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
router.get("/types", async (req, res, next) => {
  // CARGO LA BD CON LOS TYPES DE DIETAS  
  try {
    const type = await axios.get(
      // `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_temp }&number=9&addRecipeInformation=true`
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_temp}&addRecipeInformation=true&number=100`
    );
    res.send(
      type.data.results.map((e) => {
        return {
          id: e.id,
          title: e.title,
          image: e.image,
          vegetarian: e.vegetarian,
          vegan: e.vegan,
          glutenFree: e.glutenFree,
          dietas: e.diets,
        };
      })
    );
  } catch (error) {
    next();
  }

});

//***************        GET  QUERY   LISTO    ***************************************************** */
// [ ] GET /recipes?name="...":
// Obtener un LISTADO de las recetas QUE CONTENGAN LA PALABRA O NOMBRE como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.get("/recipes", async (req, res) => {
  let name = req.query.name;
  const dbInfo = await getDb();
  let dbInfoQuery = await dbInfo.filter((e) =>
    e.name.toLowerCase().includes(name.toLowerCase())
  );

  // res.send(dbInfoQuery)
  // try {
  let recipes = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_temp}&addRecipeInformation=true&number=100&query=${name}`
  );
  apiInfoQuery = await recipes.data.results.map((e) => {
    return {
      id: e.id,
      image: e.image,
      title: e.title,
      vegetarian: e.vegetarian,
      vegan: e.vegan,
      glutenFree: e.glutenFree,
      dietas: e.diets,
    };
  });
  //  res.send(apiInfoQuery);

  const responseTotal = dbInfoQuery.concat(apiInfoQuery);
  const dataQuery = dbInfoQuery.concat(apiInfoQuery);
  if (responseTotal.length === 0) {
    res.status(400).send("entre a error");
  } else {
    res.status(200).send(dataQuery);
  }
});

//****************   GET DETALLE LISTO   ************************************ */
// [ ] GET /recipes/{idReceta}:
// Obtener el DETALLE DE UNA RECETA en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get("/recipes/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const verifId = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
    if (!verifId.test(id)) {
      let apiInfoDetail = {};
      let response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_temp}`
      );
      let apiIdInfo2 = response.data;
      apiInfoDetail = {
        id: apiIdInfo2.id,
        title: apiIdInfo2.title,
        image: apiIdInfo2.image,
        summary: apiIdInfo2.summary,
        vegetarian: apiIdInfo2.vegetarian,
        vegan: apiIdInfo2.vegan,
        glutenFree: apiIdInfo2.glutenFree,
        diets: apiIdInfo2.diets,
        aggregateLikes: apiIdInfo2.aggregateLikes,
        healthScore: apiIdInfo2.healthScore,
        instructions: apiIdInfo2.instructions,
        dishTypes: apiIdInfo2.dishTypes,
      };
      res.json(apiInfoDetail);
      console.log("Busco por API");
    } else {
      const dbInfoDetail = await Recipe.findByPk(id);
      res.send(dbInfoDetail);
    }
  } catch (error) {
    res.status(400).send("error");
    //  next()
  }
});

//************************************************************************************************************************************************************************************ */
//                                                                  POST
//************************************************************************************************************************************************************************************ */
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// CREA  una receta en la base de datos
router.post("/recipe", async (req, res, next) => {
  let { name, summary, aggregateLikes, healthScore, instructions,diets } = req.body;

  try {
    // CARGO LA BD CON LOS TYPES DE DIETAS

    const recipe = await Recipe.create({
      name,
      summary,
      aggregateLikes,
      healthScore,
      instructions,
      diets,      
    })

          // // BUSCO EN LA DB LA DIETA PARA ASOCIARSELA A LA RECETA
          const dietDb = await TypeDiet.findAll({
            where: { name: diets },
          })
          // AGREGO LA DIETA A LA RECETA EN LA DB
          //console.log(dietDb);

          //  ASOCIO LA TABLA INTERMEDIA
          await recipe.addTypeDiet(dietDb);
          
          res.send("Personaje creado correctamente");
      
    // res.json(recipe);
  } catch (error) {
    next();
  }
});


module.exports = router;

