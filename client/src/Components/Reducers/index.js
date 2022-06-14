const initialState = {
    recipes:[]
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case  "ADD_RECIPES": {
            return ({
                ...state, recipes: action.recipes,
            })
        } 
        case "SEARCH_TYPES": {
            return {
                ...state, 
                recipes: action.payload
            }
        }

        default:
            return state
    }
}


// export function getRecipes(state, action) {
    
//     return async function (dispatch) {
//     try {
//         let allRecipes = await axios.get('http://localhost:3001/types')
//         console.log(allRecipes)
//     } catch (error) {
//         return ("Dio Error")
//     }

//     }
// }