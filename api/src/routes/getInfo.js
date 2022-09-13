const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { YOUR_API_KEY } = process.env;

const getApiDog = async()=>{
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    const apiInfo = await apiUrl.data.map(e=>{
        return{
            id: e.id,
            name: e.name,
            image: e.image.url,
            height_min: e.height.metric.split(" - ").length === 1 ? 'desconocido' :
                                        e.height.metric.split(" - ")[0] !== 'NaN' ?
                                        e.height.metric.split(" - ")[0] : 'desconocido',
            height_max: e.height.metric.split(" - ").length === 1 ?
                                        e.height.metric !== 'NaN' ? e.height.metric: 'desconocido' :
                                        e.height.metric.split(" - ")[1],
            weight_min: e.weight.metric.split(" - ").length === 1 ? 'desconocido' :
                                        e.weight.metric.split(" - ")[0],
            weight_max: e.weight.metric.split(" - ").length === 1 ? 'desconocido' :
                                        e.weight.metric.split(" - ")[1],
            life_span: e.life_span,
            origin: e.origin,
            temperaments: e.temperament
        }
    })
    return apiInfo
}

const getdbDog = async()=>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through:{
                attributes: [],//mediante los atributos => me traeria todos los casos de q fuera mas sin la comprobacion through
            }
        }
    })
}

const getAllDogs = async()=>{
    const apiInfo = await getApiDog();
    const dbInfo = await getdbDog();
    const AllInfo = apiInfo.concat(dbInfo);
    return AllInfo;
}

module.exports = {
    getApiDog,
    getdbDog,
    getAllDogs
}