const { response } = require("express");
const jwt = require('jsonwebtoken');

 const validarJuego = (req,res = response, next ) => {

    const token = req.header('buscar');
    
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'error en el token'
        });
    }

    try {
        const {sku,nombre}= jwt.verify( token,process.env.SECRET_JWT_SEED);
        console.log(sku,nombre);
        req.id = sku;
        req.nombre = nombre;
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        });
    }

    //TODO OK
    next();
 }


 module.exports = {
    validarJuego
}