const { Router } = require('express');
const { Dog, Temperament } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const DogRouter = require('./Dogs');
const TemperamentRouter = require('./Temperaments');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', DogRouter);
router.use('/temperaments', TemperamentRouter)


router.post('/dog', async(req, res) =>{
    const {
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        image,
        createdInDb,
        temperaments
    }=req.body

    const dogCreate = await Dog.create({
        name,
        image,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span: life_span + ' years',
        createdInDb,
    })
    
    let tempDb = await Temperament.findAll({
        where: {name: temperaments}
    })
    dogCreate.addTemperament(tempDb)
    res.status(200).send('Perro creado correctamente')
})


module.exports = router;
