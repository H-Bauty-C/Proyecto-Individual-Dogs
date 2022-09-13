import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get ('http://localhost:3001/dogs')
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getNameDogs(payload){
    return async function (dispatch){
        try {
            var json = await axios.get('http://localhost:3001/dogs?name=' + payload)
            return dispatch({
                type: 'GET_NAME_DOGS',
                payload: json.data
            })
        } catch (err) {
            alert (err = 'The dog does not exist')
        }
    }
}

export function getTemperaments(){
    return async function (dispatch){
        var json = await axios.get ('http://localhost:3001/temperaments')
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function postDogs(payload){
    return async function(dispatch){
        var json = await axios.post('http://localhost:3001/dog', payload)
        return json;
    }
}

export function filterDogsbyTemperament(payload){
    return{
        type:'FILTER_TEMP',
        payload
    }
}

export function filterCreated(payload){
    return{
        type:'FILTER_CREATED',
        payload
    }
}

export function ordenName(payload){
    return{
        type: 'ORDER_NAME',
        payload
    }
}

export function weigth(payload){
    return{
        type: 'SORT_BY_WEIGHT',
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function deleteDetails() {
    return async function (dispatch){
    return dispatch({
        type: 'DELETE_DETAILS'
    })
}
}