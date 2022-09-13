const { Router } = require('express');
const router = Router();
const { getAllDogs } = require('./getinfo')
const axios = require('axios')
const{ Dog, Temperament } = require('../db')

router.get('/', async(req, res)=>{
    const {name} = req.query;
    const dogsTotal = await getAllDogs();
    if(name){
        let dogsName = await dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        dogsName.length ?
        res.status(200).send(dogsName) :
        res.status(404).send('No se ecuentra el perro')
    }else{
        res.status(200).send(dogsTotal)
    }
})

router.get('/:id', async(req, res, next)=>{
    try {
        const {id} = req.params
        const allDogs = await getAllDogs()
        if(id){
            let dogs = allDogs.filter(e => e.id == id) //no puse el === xq eso verifica si es tmb el mismo tipo y contenido el == verifica el mismo contenido
            //xq hay ID string(son los de UUID) y ID numericos(los q vienen x defecto de las Apis)
            dogs.length ? res.status(200).json(dogs) : res.status(404).send('El pichichu no existe')
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router;