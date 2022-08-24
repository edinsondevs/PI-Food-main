const initialState = {
    recipes: [],
    typeDiets: [],
    details: [],
    recipesOrderLikes: [],
    dietasFiltradas: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':         // GET_RECIPES
            return {
                ...state,
                recipes: action.payload
            }
            
        case 'GET_TYPE_RECIPES':
            return ({
                ...state,
                typeDiets: action.payload
            })

        // ORDENAMIENTO POR NOMBRE
        case 'ORDER_BY_NAME':
            // console.log(state.recipes)
            let sortArr = action.payload === 'asc' ?
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1
                    }
                    if (a.title < b.title) {
                        return -1
                    }
                    return 0
                }) : state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1
                    }
                    if (a.title < b.title) {
                        return 1
                    }
                    return 0
                })
            // console.log(sortArr);
            return {
                // ...state,
                recipes: sortArr
            }

        // ORDENAMIENTO POR LIKES
        case 'ORDER_BY_LIKES':
            let sortArrLikes = action.payload === 'asc' ?
                state.recipes.sort(function (a, b) {
                    if (a.aggregateLikes > b.aggregateLikes) {
                        return 1
                    }
                    if (a.aggregateLikes < b.aggregateLikes) {
                        return -1
                    }
                    return 0
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.aggregateLikes > b.aggregateLikes) { 
                        return -1
                    }
                    if (a.aggregateLikes < b.aggregateLikes) {
                        return 1
                    }
                    return 0
                })
            // console.log(sortArrLikes);
            return {
                // ...state,
                recipes: sortArrLikes
            }

        // BUSQUEDA POR NOMBRE
        case 'GET_NAME_RECIPES':
            return {
                ...state,
                recipes: action.payload
            }

        case 'GET_RECIPES_BY_ID':
            return {
                ...state,
                details: action.payload
            }


        case 'POST_NAME_RECIPES':
            return {
                ...state,
            }
        
        case 'DELETE_RECIPE_BY_ID':
            return {
                ...state,
                ...state.recipes
            }


        default: return state;
    }
}


