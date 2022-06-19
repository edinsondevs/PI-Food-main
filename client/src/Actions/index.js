import axios from 'axios';


export const getRecipes = () => { 
    return async (dispatch) => {
        var json = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }   
}

export const getTypeRecipes = (payload) => {

    return{
        type: 'GET_TYPE_RECIPES',
        payload
    }
}

export const orderByName = (payload) => {

    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export const orderByLikes = (payload) => {

    return {
        type: 'ORDER_BY_LIKES',
        payload
    }
}

export const getNameRecipes = (payload) => {

    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/recipes?name='+ payload);
        return dispatch({
            type: 'GET_NAME_RECIPES',
            payload: json.data
        })
    }
}

export const getNewRecipe = (payload) => {
    return async function (dispatch) {
        var json = await axios.post('http://localhost:3001/recipe', payload);
        console.log(json);
        return json    
    }    
} 