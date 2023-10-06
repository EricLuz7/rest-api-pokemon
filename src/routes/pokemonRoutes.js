const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const PokemonController = require('../controllers/pokemonController');

router.post('', PokemonController.create);
router.get('', checkAuth, PokemonController.getAll);
router.get('/:codigo', PokemonController.getOne);
router.put('/:codigo', PokemonController.update);
router.delete('/:codigo', checkAuth, PokemonController.delete);
//router.get('/pokemons', PokemonController.getPokemon);


module.exports = router;