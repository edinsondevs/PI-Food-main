const initialState = {
    recipes: [],
    typeDiets: []
}
 
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':         // GET_RECIPES
            return {
                ...state,
                recipes: action.payload
            }
        case 'GET_TYPE_RECIPES':
            const allRecipes = state.recipes
            const typeRecipes = action.payload === 'All' ? allRecipes : allRecipes.filter(e => e.dietas === action.payload)            
            return {
                ...state,
                recipes: typeRecipes
            }
            
        case 'ORDER_BY_NAME':
            
            let sortArr = action.payload === 'asc' ? 
            state.recipes.sort(function(a, b) {
                    if (a.title > b.title){
                    return 1
                }
                if (a.title < b.title){
                    return -1
                }
                return 0
                }) : state.recipes.sort(function(a, b) {
                    if (a.title > b.title){
                    return -1
                }
                if (a.title < b.title){
                    return 1
                }
                return 0
                })
                console.log(sortArr);
            return {
                ...state,
                recipes: sortArr
            }

            case 'ORDER_BY_LIKES':
            
            let sortArrLikes = action.payload === 'asc' ? 
            state.recipes.sort(function(a, b) {
                    if (a.title > b.title){
                    return 1
                }
                if (a.title < b.title){
                    return -1
                }
                return 0
                }) : state.recipes.sort(function(a, b) {
                    if (a.title > b.title){
                    return -1
                }
                if (a.title < b.title){
                    return 1
                }
                return 0
                })
                // console.log(sortArr);
            return {
                ...state,
                recipes: sortArrLikes
            }

        case 'GET_NAME_RECIPES':
            return {
                ...state,
                recipes: action.payload
            }
            
        case 'POST_NAME_RECIPES':
            return {
                ...state,             
            }


        default: return state;
    }
}


