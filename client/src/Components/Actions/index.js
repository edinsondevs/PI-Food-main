import axios from 'axios';

export const addRecipes = (recipes) =>{

    return ({
        type: 'ADD_RECIPES',
        recipes: recipes
    })

}

export const searchTypes = () => { 
    return async (dispatch) => {
        var json = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: 'SEARCH_TYPES',
            payload: json.data
        })
    }   
}

