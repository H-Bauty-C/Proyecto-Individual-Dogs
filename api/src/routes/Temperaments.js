const { Router } = require('express');
const router = Router();
const { Temperament } = require('../db')
const axios = require('axios')
const { YOUR_API_KEY } = process.env;

const allTemperament = async(req, res)=>{
    const temps = await Temperament.findAll()
    try {
        if(temps.length === 0){
            let dataDogs = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)).data
            let tempList = await dataDogs.map(tem=>tem.temperament).join().split(", ").join().split(",")

            for(let i = 0; i < tempList.length; i++){
                await Temperament.findOrCreate({//buscará los documentos que coincidan o lo creará si no existe, y te devolverá el nuevo documento recién creado o encontrado
                    where:{name: tempList[i]}
                })
            }
            const allTemps = await Temperament.findAll()
            res.json(allTemps)
        }else{
            res.json(temps)
        }
    } catch (err) {
        console.log(err)
    }
}

router.get('/', allTemperament)

module.exports = router;