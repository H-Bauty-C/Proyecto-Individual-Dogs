const initialState = {
    dogs: [],
    alldogs: [],
    temperaments: [],
    detail:[]
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                alldogs: action.payload
            }
            case 'GET_NAME_DOGS':
                return {
                    ...state,
                    dogs: action.payload
                }
            case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
            case 'POST_DOGS':
                return{
                    ...state
                }
            case 'FILTER_TEMP':
                const allDogs = state.alldogs
                const tempFilter = action.payload === 'all' ? allDogs : 
                allDogs.filter(e => {//state.dogs va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allDogs, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.
                    if (typeof (e.temperaments) === 'string') return e.temperaments.includes(action.payload);
                    if (Array.isArray(e.temperaments)) {//Array.isArray determina si el valor pasado es un Array
                        let temps = e.temperaments.map(e => e.name);
                        return temps.includes(action.payload);
                    }
                    return true;
                });
            return{
                ...state,
                dogs: tempFilter
            }
            case 'FILTER_CREATED':
                const all = state.alldogs
                const originFiltered = action.payload === 'all' ? all : 
                action.payload === 'created' ? all.filter(el => el.createdInDb) : 
                all.filter(el => !el.createdInDb);
                return{
                    ...state,
                    dogs: originFiltered
                }
            case 'ORDER_NAME':
                const sortedName = action.payload === 'desc' ?
                state.dogs.sort(function (a, b) {//sort compara dos valores y va poniendo a la der o izq dependiendo si son mas grandes o mas chicos
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {//ordena los elementos y devuelve el arreglo ordenado.
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: sortedName,
            }
            case 'SORT_BY_WEIGHT':
            const sortedWeight = action.payload === 'all' ? state.dogs.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            }) :
             action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    return parseInt(a.weight_min) - parseInt(b.weight_min);
                }) :
                state.dogs.sort(function (a, b) {
                    return parseInt(b.weight_max) - parseInt(a.weight_max);
                });
            return {
                ...state,
                dogs: sortedWeight,
            }
            case 'GET_DETAIL':
                return{
                    ...state,
                    detail: action.payload
                }
            case 'DELETE_DETAILS':
                return{
                    ...state,
                    detail: []
                }
            default:
                return state;
    }
    
}

export default rootReducer;