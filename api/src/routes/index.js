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
//                                                           FUNCIONES DE CONSULTAS PRINCIPALES
//************************************************************************************************************************************************************************************ */
//************************************            CONSULTA A LA API
const getApi = async () => {
  const api = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_temp}&addRecipeInformation=true&number=100`);

  const apiInfo = api.data.results.map((e) => {
    return {
      id: e.id,
      image: e.image,
      title: e.title,
      image: e.image,
      aggregateLikes: e.aggregateLikes,
      typeDiets: e.diets.map((e) => e),
    };
  });
  return apiInfo;
};

//***************************************       CONSULTA A LA BD
const getDb = async () => {
  const allTypes = await Recipe.findAll({
    include: {
      model: TypeDiet,
      attributes: ["title"],
      througth: {
        attributes: [],
      },
    },
  });

  const getAllTypes = await allTypes.map(e => {
    const newDiets = []
    const diets = allTypes.map((e) => e.typeDiets)
    const typesEach = diets.map((e) => {
      e.forEach((element, index) => {
        newDiets.push((element["title"]))
      })
    })
    return {
      id: e.id,
      title: e.title,
      summary: e.summary,
      aggregateLikes: e.aggregateLikes,
      healthScore: e.healthScore,
      instructions: e.instructions,
      image: e.image,
      createdInDb: e.createdInDb,
      typeDiets: newDiets
    }
  })
  return getAllTypes
};

//***************************************       BUSQUEDA DE TIPOS DE DIETAS
const getAllDiets = async () => {
  const getApiInfo = await getApi();
  const getDbInfo = await getDb();
  const infoTotal = getApiInfo.concat(getDbInfo);
  return infoTotal;
};

/************ *****************************ACA ES PRUEBA DE DB 01:00 ******************************/
router.get('/db', async (req, res) => {
  const getAllTypes = await getDb()
  // const getAllTypes = await getApi()
  // const getAllTypes = await getAllDiets()

  res.send(getAllTypes)
})
/************ *****************************EL DE ARRIBA ES PRUEBA DE DB 01:00 ******************************/


//*************************************    GET TYPES  **************************** */
//    EXTRAE SOLO LOS DATOS NECESARIOS
// Obtener TODOS los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
router.get("/types", async (req, res, next) => {
  try {
    
    const typeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_temp}&addRecipeInformation=true&number=100`);
    const types = typeApi.data.results.map((e) => e.diets)
    const typesEach = types.flat();
    typesEach.forEach(e => {
      TypeDiet.findOrCreate({
      where: { title: e }
    })
      .then(e => e)
      .catch(e => e)
    })
    const allTypes = await TypeDiet.findAll();
    const newDiets = allTypes.map((e) => e.title)
    res.status(200).send(newDiets);  
  } catch (error) {
    next(error)
  }
    

});


//***************        GET  QUERY   GET /recipes?name="...": ***************************************************** */
// [ ] GET /recipes?name="...":
// Obtener un LISTADO de las recetas QUE CONTENGAN LA PALABRA O NOMBRE como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.get("/recipes", async (req, res) => {
  let title = req.query.name;
  const allDiets = await getAllDiets();
  const dbInfo = await getDb();
  // console.log(dbInfo);

  let recipes = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_temp}&addRecipeInformation=true&number=100&query=${title}`
  );

  if (title) {
    let dbInfoQuery = await dbInfo.filter((e) =>
      e.title.toLowerCase().includes(title.toLowerCase()));
    apiInfoQuery = await recipes.data.results.map((e) => {
      return {
        id: e.id, image: e.image, title: e.title,
        aggregateLikes: e.aggregateLikes,
        typeDiets: e.diets.map((e) => e),
      };
    });
    //  res.send(apiInfoQuery);
    const responseTotal = dbInfoQuery.concat(apiInfoQuery);
    const dataQuery = dbInfoQuery.concat(apiInfoQuery);
    if (dataQuery.length === 0) {
      res.status(400).send("No existe ninguna receta con ese nombre");
    } else {
      res.status(200).send(dataQuery);
    }
  } else {
    res.status(200).send(allDiets)
  }
});

//****************   GET DETALLE    GET /recipes/{idReceta}:  ************************************ */
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
        typeDiets: apiIdInfo2.diets.map((e) => e),
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
    next(error)
  }
});

//*********************       POST      POST /recipe:                  *************************************** */
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// CREA  una receta en la base de datos
router.post("/recipe", async (req, res, next) => {
  let { title, summary, aggregateLikes, healthScore, instructions, typeDiets, image , dishTypes} = req.body;
  // let typeDiets = diets
  console.log(typeDiets)

  try {
    // CARGO LA BD CON LOS TYPES DE DIETAS
    const recipe = await Recipe.create({
      title,
      summary,
      aggregateLikes,
      healthScore,
      instructions,
      typeDiets,
      image,
      // dishTypes
    })
    // // BUSCO EN LA DB LA DIETA PARA ASOCIARSELA A LA RECETA
    // const dietDb = await TypeDiet.findAll({
    //   where: { title: typeDiets },
    // })
    const diets = await TypeDiet.findAll({
      where: { title: typeDiets }
    })
    // AGREGO LA DIETA A LA RECETA EN LA DB
    // console.log(dietDb);
    //  ASOCIO LA TABLA INTERMEDIA
    // console.log(created);
    await recipe.addTypeDiet(diets);
    res.send("Personaje creado correctamente");
  } catch (error) {
    next(error);
  }
});



module.exports = router;




