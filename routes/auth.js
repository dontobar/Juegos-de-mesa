const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario,loginUsuario,revalidarToken,crearJuego, revalidarJuego, obtenerJuegos, obtenerJuegosID, obtenerTermino, actualizarJuegos, borrarProductos } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const Juegos = require('../models/Juegos');
//const { validarJuego } = require('../middlewares/validar-juego');


const router = Router();

//crear un nuevo usuario
router.post('/new',[
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').isLength({min:6}),
    validarCampos
],crearUsuario);

//crear un nuevo juego
router.post('/newjuego',[
    check('id','el id es obligatorio').not().isEmpty(),
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('descripcion','la descripcion es obligatoria').not().isEmpty(),
    check('sku','el sku es obligatorio').not().isEmpty(),
    check('categoria','la categoria es obligatorio').not().isEmpty(),
    check('idioma','el idioma es obligatorio').not().isEmpty(),
    check('njugadores','el njugadores es obligatorio').not().isEmpty(),
    check('edad','la edad es obligatorio').not().isEmpty(),
    check('precio','el precio es obligatorio').not().isEmpty(),
    check('tiempo','el tiempo es obligatorio').not().isEmpty(),
    check('compania','la compania es obligatorio').not().isEmpty(),
    check('alt_img'),
    validarCampos
],crearJuego);

//Login de usuario
router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').isLength({min:6}),
    validarCampos
],loginUsuario);


router.get('/renew',validarJWT,revalidarToken);
router.get('/',obtenerJuegos,obtenerJuegosID);
router.get('/:id',obtenerJuegosID);
router.get('/termino/:termino',obtenerTermino);
router.put('/:id',actualizarJuegos);
router.delete('/:id',borrarProductos);


module.exports = router;
