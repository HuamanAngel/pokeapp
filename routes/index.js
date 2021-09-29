var express = require('express');
var router = express.Router();

// Importamos los controladores que usaremos

const pokemonController = require('../src/controllers/pokemonController')

// Rutas de pokemon
router.get('/',pokemonController.showAll);
router.get('/pokemon/show/all',pokemonController.showAll);
router.get('/pokemon/create',pokemonController.create);
router.post('/pokemon/create/process',pokemonController.store);
router.get('/pokemon/show/one/:id',pokemonController.showOne);
router.post('/pokemon/edit/one/:id',pokemonController.editOne);
router.get('/pokemon/delete/one/:id',pokemonController.deleteOne);

module.exports = router;
