const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const TipoController = require('../controllers/tipoController');

router.post('', TipoController.create);
router.get('/', TipoController.getAll);
router.put('/:id',  checkAuth, TipoController.update);
router.get('/:id', checkAuth, TipoController.getOne);
router.delete('/:id', checkAuth, TipoController.delete);

module.exports = router;