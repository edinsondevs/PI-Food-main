require("dotenv").config();
const { Router, response } = require("express");
const axios = require("axios");
const { Recipe, TypeDiet } = require("../db.js");
const { Op } = require("sequelize");
const { API_temp } = process.env; //    CAMBIAR EN TODOS LOS FETCH EL NOMBRE HASTA API_temp  si se bloquea la API por consultas
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);[]

//************************************************************************************************************************************************************************************ */
//                              FUNCIONES DE CONSULTAS PRINCIPALES Y PREVIAS DE LA APP
//************************************************************************************************************************************************************************************ */
//************************************            CONSULTA A LA APIDB
const getApi = async () => {
  const api = await axios.get(
    // `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_temp}&addRecipeInformation=true&number=100`);
    `http://localhost:3004/results`);
  const e = api.data;
  let results = e.map(e => {
    return {
      id: e.id,
      title: e.title,
      summary: e.summary,
      aggregateLikes: e.aggregateLikes,
      healthScore: e.healthScore,
      instructions: e.instructions,
      image: e.image,
      createdInDb: e.createdInDb,
      typeDiets: e.diets.map(el => el),
    }
  });
  // const data = response.data
  // return data
  return results;
};

//***************************************       CONSULTA A LA BD
const getDb = async () => {
  const dbInfoDetail = await Recipe.findAll({
    include: {
      model: TypeDiet,
      attributes: ["title"],
    }
  });

  dbInfoQuery = await dbInfoDetail.map((e) => {
    return {
      id: e.id,
      title: e.title,
      summary: e.summary,
      aggregateLikes: e.aggregateLikes,
      healthScore: e.healthScore,
      instructions: e.instructions,
      image: e.image,
      createdInDb: e.createdInDb,
      typeDiets: e.typeDiets.map(e => e.title),
    };
  });
  return dbInfoQuery
};

//***************************************       INTEGRACION DE LOS DATOS ENTRE LA APIDB Y LA DB
const getAllDiets = async () => {
  const getApiInfo = await getApi();
  const getDbInfo = await getDb();
  const infoTotal = getDbInfo.concat(getApiInfo);
  return infoTotal;
};

//*************************************    GET TYPES PARA CARGAR EL SELECT DE TIPOS DE DIETAS  **************************** */
router.get('/types/diets/db', async (req, res) => {
  const searcrDiets = await TypeDiet.findAll({
    atributes: ["title"],
  });
  const types = res.status(200).send(searcrDiets.map((e) => e.title))
  return types

})
//************************************************************************************************************************************************************************************ */
//                              INICIO DE ROUTEO DE LA APLICACION
//************************************************************************************************************************************************************************************ */

//*************************************    GET TYPES  **************************** */
//    EXTRAE SOLO LOS DATOS NECESARIOS
// Obtener TODOS los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
router.get("/types", async (req, res, next) => {
  try {
    // const typeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_temp}&addRecipeInformation=true&number=100`);
    const typeApi = await axios.get(`http://localhost:3004/results`);
    let array = [];
    let types = typeApi.data.map(e => {
      return [
        e.diets.map(el => el),
      ]
    })

    const typesEach = types.flat(2);
    typesEach.forEach(e => {
      TypeDiet.findOrCreate({
        where: { title: e }
      })
        .then(e => e)
        .catch(e => e)
    })
    const allTypes = await TypeDiet.findAll();
    const newDiets = allTypes.map((e) => e.title)
    res.status(200).send(typesEach);
  } catch (error) {
    next(error)
  }
});




//***********     GET QUERY /recipes?name="...": PARA BUSCAR TODAS LAS RECETAS O POR NOMBRE INGRESADO POR QUERY ***************************************************** */
// [ ] GET /recipes?name="...":
// Obtener un LISTADO de las recetas QUE CONTENGAN LA PALABRA O NOMBRE como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
router.get("/recipes", async (req, res) => {
  let title = req.query.name;
  const allDiets = await getAllDiets();
  const dbInfo = await getDb();

  //*******************     RESPONDE CON TODAS SI NO EXISTE EL NOMBRE                ****************
  if (!title) res.status(200).send(allDiets);

  //*******************     SI EXISTE EL NOMBRE DEBE BUSCAR EN LA APIDB Y EN LA DB   ****************
  if (title) {
    //********         BUSCO EN LA DB                  
    const dbInfoDetail = await Recipe.findAll({
      where: {
        title: {
          [Op.eq]: 'Cauliflower, Brown Rice, and Vegetable Fried Rice',
        }
      },
      include: {
        model: TypeDiet,
        attributes: ["title"],
      }
    });
    dbInfoQuery = await dbInfoDetail.map((e) => {
      return {
        id: e.id,
        title: e.title,
        summary: e.summary,
        aggregateLikes: e.aggregateLikes,
        healthScore: e.healthScore,
        instructions: e.instructions,
        image: e.image,
        createdInDb: e.createdInDb,
        typeDiets: e.typeDiets.map(e => e.title),
      };
    });
    // res.send(dbInfoQuery)

    //  res.send(id)
    let apiInfoDetail = {};
    // let response = await axios.get(`http://localhost:3004/results/${id}`); ?title_like=
    let response = await axios.get(`http://localhost:3004/results?title_like=${title}`); // ?title_like=
    let apiIdInfo2 = await response.data;
    apiInfoDetail = await apiIdInfo2.map((e) => {
      return {
      id: e.id,
      title: e.title,
      image: e.image, 
      summary: e.summary,
      typeDiets: e.diets.map((e) => e),
      aggregateLikes: e.aggregateLikes,
      healthScore: e.healthScore,
      instructions: e.instructions,
      dishTypes: e.dishTypes,
    }
    })
    console.log("Busco por API");
    // res.send(apiInfoDetail);
    // res.send(dbInfoQuery)//.concat(apiInfoDetail);
  // }
  //************************     BUSCO EN LA APIDB   

  const dataQuery = dbInfoQuery.concat(apiInfoDetail);
  if (dataQuery.length === 0) {
    res.status(400).send("No existe ninguna receta con ese nombre");
  } else {
    res.status(200).send(dataQuery);
  }
  }
});

//****************   GET DETALLE    GET /recipe/{idReceta}:  ************************************ */
// [ ] GET /recipes/{idReceta}:
// Obtener el DETALLE DE UNA RECETA en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
router.get("/recipe/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const verifId = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
    if (verifId.test(id)) {
      const dbInfoDetail = await Recipe.findAll({
        where: {
          id: {
            [Op.eq]: id
          }
        },
        include: {
          model: TypeDiet,
          attributes: ['title'],
        }
      });
      // res.send(dbInfoDetail)
      dbInfoQuery = await dbInfoDetail.map((e) => {
        return {
          id: e.id,
          title: e.title,
          summary: e.summary,
          aggregateLikes: e.aggregateLikes,
          healthScore: e.healthScore,
          instructions: e.instructions,
          image: e.image,
          createdInDb: e.createdInDb,
          typeDiets: e.typeDiets.map(e => e.title),
        };
      });
      console.log("Busco por DB");
      return res.send(dbInfoQuery[0])
    }
    else {
      let apiInfoDetail = {};
      let response = await axios.get(`http://localhost:3004/results/${id}`);
      let apiIdInfo2 = response.data;
      apiInfoDetail = {
        id: apiIdInfo2.id,
        title: apiIdInfo2.title,
        image: apiIdInfo2.image,
        summary: apiIdInfo2.summary,
        typeDiets: apiIdInfo2.diets.map((e) => e),
        aggregateLikes: apiIdInfo2.aggregateLikes,
        healthScore: apiIdInfo2.healthScore,
        instructions: apiIdInfo2.instructions,
        dishTypes: apiIdInfo2.dishTypes,
      };
      console.log("Busco por API_DB");
      return res.send(apiInfoDetail);
    }
  } catch (error) {
    next(error)
  }
});

//*********************       DELETE      DELETE /recipe:                  *************************************** */
router.delete('/recipe/delete/:id', async (req, res) => {
  const id = req.params.id
  try {
  Recipe.destroy({
    where: {
      id: {
        [Op.eq]: id
      }
    },
    include: {
      model: TypeDiet,
      attributes: ['title'],
    }
  });
  res.send("Receta eliminada exitosamente")
  } catch (error) {
    res.status(400).send("No pudo ser eliminado")
  }
})

//*********************       POST      POST /recipe:                  *************************************** */
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// CREA  una receta en la base de datos
router.post("/recipe", async (req, res, next) => {
  let { title, summary, aggregateLikes, healthScore, instructions, typeDiets, image } = req.body;
  if (image === "") image = "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png";
  console.log(req.body)
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
    })
    // BUSCO LOS TIPOS DE DIETAS EN LA DB SEGUN LO QUE ME LLEGA POR BODY
    const diets = await TypeDiet.findAll({
      where: { title: typeDiets }
    })
    // AGREGO LA DIETA A LA RECETA EN LA DB
    //  ASOCIO LA TABLA INTERMEDIA

    await recipe.addTypeDiet(diets);
    res.send("Receta creada correctamente");
  } catch (error) {
    next(error);
  }
});

//********************************************************************************************************************************
//********************************************         SECCION DE PRUEBAS O TESTING        ************************************** */
//***************        GET  QUERY   GET /apifood  ***************************************************** */
router.get('/apifood', async (req, res) => {
  let query = req.query.id
  // console.log(query)

  // if (!query) {
  //   const dietas = await axios.get(
  //     `http://localhost:3004/results`
  //   )
  //   const e = dietas.data;
  //   let results = e.map(e => {
  //     return {
  //       id: e.id,
  //       title: e.title,
  //       summary: e.summary,
  //       aggregateLikes: e.aggregateLikes,
  //       healthScore: e.healthScore,
  //       instructions: e.instructions,
  //       image: e.image,
  //       createdInDb: e.createdInDb,
  //       typeDiets: e.diets.map(el => el),
  //     }
  //   })
  //   // return results
  //   res.send(results)
  // }
  // if (!query) {
  // else{
  // const dietas = await axios.get(
  //   `http://localhost:3004/results/${query}`
  //   )
  // const e = dietas.data;
  // // console.log(e)
  // let results = 
  //   {
  //     id: e.id,
  //     title: e.title,
  //     summary: e.summary,
  //     aggregateLikes: e.aggregateLikes,
  //     healthScore: e.healthScore,
  //     instructions: e.instructions,
  //     image: e.image,
  //     createdInDb: e.createdInDb,
  //     typeDiets: e.diets.map(el => el),
  //   }
  // const verifId = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
  // if (verifId.test(id)) {
  //**************************************************************** */
  //********************************  BUSQUEDA EN LA DB */ 
  /*
      const dbInfoDetail = await Recipe.findAll({
        include: {
          model: TypeDiet,
          attributes: ["title"],
        }
      });
  
      dbInfoQuery = await dbInfoDetail.map((e) => {
        return {
          id: e.id,
          title: e.title,
          summary: e.summary,
          aggregateLikes: e.aggregateLikes,
          healthScore: e.healthScore,
          instructions: e.instructions,
          image: e.image,
          createdInDb: e.createdInDb,
          typeDiets: e.typeDiets.map(e => e.title),
        };
        res.json(dbInfoQuery)*/
});
//**************************************************************************** */ */
// }
// }
// res.send(results)
//**************************************************************** */
//********************************  BUSQUEDA INDIVIDUAL DE RECETA EN LA DB POR ID*/ 
router.get('/api', async (req, res, next) => {
  // const { id } = req.params;
  const id = req.query.name;
  try {
    const verifId = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
    if (verifId.test(id)) {
      const dbInfoDetail = await Recipe.findAll({
        where: {
          id: {
            [Op.eq]: id
          }
        },
        include: {
          model: TypeDiet,
          attributes: ['title'],
        }
      });
      // res.send(dbInfoDetail)
      dbInfoQuery = await dbInfoDetail.map((e) => {
        return {
          id: e.id,
          title: e.title,
          summary: e.summary,
          aggregateLikes: e.aggregateLikes,
          healthScore: e.healthScore,
          instructions: e.instructions,
          image: e.image,
          createdInDb: e.createdInDb,
          typeDiets: e.typeDiets.map(e => e.title),
        };
      });
      return res.json(dbInfoQuery)
    }
    //********************************  BUSQUEDA INDIVIDUAL DE RECETA EN LA API_DB POR ID*/
    else {
      //  res.send(id)
      let apiInfoDetail = {};
      // let response = await axios.get(`http://localhost:3004/results/${id}`); ?title_like=
      let response = await axios.get(`http://localhost:3004/results?title_like=${id}`); // ?title_like=
      let apiIdInfo2 = response.data;
      apiInfoDetail = apiIdInfo2.map((e) => ({
        id: e.id,
        title: e.title,
        image: e.image,
        summary: e.summary,
        typeDiets: e.diets.map((e) => e),
        aggregateLikes: e.aggregateLikes,
        healthScore: e.healthScore,
        instructions: e.instructions,
        dishTypes: e.dishTypes,
      }))
      // ({
      //   ,
      // }));
      console.log("Busco por API");
      res.send(apiInfoDetail);
    }
  } catch (error) {
    next(error)
  }
});

// http://localhost:3004/results/716426

//***********************    FALTA LA CONSULTA DE LA APIFOOD         ************************************************************* */

module.exports = router;




