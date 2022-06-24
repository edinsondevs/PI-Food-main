import axios from 'axios';


export const getRecipes = () => {
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export const getTypeRecipes = (payload) => {
    // console.log(payload)
    return async function (dispatch) {
        // let json = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: 'GET_TYPE_RECIPES',
            payload
        })
    }
}

export const orderByName = (payload) => {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export const orderByLikes = (payload) => {
            return{
            type: 'ORDER_BY_LIKES',
            payload, 
        }
    
}

export const getNameRecipes = (payload, next) => {
    // console.log(payload)
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/recipes?name=' + payload);
        try {
            return dispatch({
                type: 'GET_NAME_RECIPES',
                payload: json.data
            })
        } catch (error) {
            next(json.data);
        }
    }
}
// BUSQUEDA POR ID
export const getRecipesById = (id) => {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/recipes/' + id);
        return dispatch({
            type: 'GET_RECIPES_BY_ID',
            payload: json.data
        })
    }
}


// CREACION DE RECETA
export const postNewRecipe = (payload) => {
    return async function (dispatch) {
        let json = await axios.post('http://localhost:3001/recipe', payload);
        console.log(json);
        return json
    }
} 