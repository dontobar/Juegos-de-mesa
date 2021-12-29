const { response } = require('express');
const Usuario = require('../models/Usuario');
const Juegos = require('../models/Juegos');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req,res = response )=>{

    const { email, name, password } = req.body;
    //console.log ("nombre:"+name,"correo:"+email,"contraseña:"+password);
    
    
    try{
        //Verificar el email
        const usuario= await Usuario.findOne({email});

        if( usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe con ese email'
            });
        }
        //Crear Usuario con el modelo
        const dbUser = new Usuario (req.body);

        //Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password,salt);

        //Genrar el JWT
        const token = await generarJWT(dbUser.id,name);

        //Crear usuario de base de datos
       await dbUser.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid:dbUser.id,
            name,
            email,
            token
        });

    }catch(error){
        return res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
    }





    return res.json({
        ok:true,
        msg:'Crear usuario /new'
    });
}

const loginUsuario = async(req,res = response)=>{

    const {email,password} = req.body;
    //console.log("correo:"+ email, "contraseña:"+password);

    try {

        const dbUser = await Usuario.findOne({email});

        if(! dbUser ){
            return res.status(400).json({
                ok:false,
                msg:'El correo no existe'
            });
        }
        
        //Confirmar si el password hace match
        const validPassword = bcrypt.compareSync ( password, dbUser.password);

        if( !validPassword){
            return res.status(400).json({
                ok:false,
                msg:'El password no es valido'
            });
        }

        // Generar el JWT
        const token = await generarJWT(dbUser.id,dbUser.name);

        //Respuesta del servicio
        return res.json({
            ok:true,
            uid: dbUser.id,
            name: dbUser.name,
            email:dbUser.email,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });
        
    }
}

const obtenerJuegos = async (req,res) =>{
    try {
        const productos = await Juegos.find();
        res.json(productos)
    } catch (error) {
        console.log(error);
        res.status(500).send('hubo un error');
    }
}
const obtenerJuegosID = async (req,res) =>{
    try {
        let id = req.params.id;
        const productos = await Juegos.find({id:id});

        if(productos.length>1 ){
            res.json(productos);
        }else{
            res.json(productos[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const obtenerTermino = async (req,res) =>{
    try {
        let termino = req.params.termino;
        const productos = await Juegos.find({nombre:{'$regex':termino}}).limit(5);
        res.json(productos)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


const crearJuego = async (req,res = response )=>{

    const {id,nombre,descripcion,sku,categoria,idioma,
           njugadores,edad,precio,tiempo,compania,alt_img} = req.body;
     
    try {

        const dbJuego = new Juegos(req.body);
        await dbJuego.save();
        return res.status(201).json({
            ok:true,
            id,
            nombre,
            descripcion,
            sku,
            categoria,
            idioma,
            njugadores,
            edad,
            precio,
            tiempo,
            compania,
            alt_img
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });
        
    }

}

const revalidarToken = async(req,res = response)=>{
    revalidarToken
        const {uid} = req;
    
        //leer la base de datos
        const dbUser = await Usuario.findById(uid);
    
    
        //Generar nuevo JWT
        const token = await generarJWT( uid,dbUser.name);
    
        return res.json({
            ok:true,
            uid,
            name:dbUser.name,
            email:dbUser.email,
            poder:dbUser.poder,
            token
        });
    }

    const actualizarJuegos = async (req,res) =>{
            const producto1 = {

                    nombre:req.body.nombre,
                    descripcion: req.body.descripcion,
                    sku: req.body.sku,
                    categoria: req.body.categoria,
                    idioma: req.body.idioma,
                    njugadores: req.body.njugadores,
                    edad: req.body.edad,
                    precio: req.body.precio,
                    tiempo: req.body.tiempo,
                    compania: req.body.compania,
                    alt_img: req.body.alt_img
             };
            Juegos.update({id: req.params.id},{$set:producto1}).then(
                () => {
                  res.status(201).json({
                    message: 'El Producto se ha actualizado'
                  });
                }
              ).catch(
                (error) => {
                  res.status(400).json({
                    error: error
                  });
                }
              );
            }
        const borrarProductos = async (req,res) =>{

            Juegos.deleteOne({id: req.params.id}).then(
                () => {
                  res.status(201).json({
                    message: 'El Producto se ha Borrado'
                  });
                }
              ).catch(
                (error) => {
                  res.status(400).json({
                    error: error
                  });
                }
              );
        }
    
    
 module.exports = {
     crearUsuario,
     loginUsuario,
     crearJuego,
     revalidarToken,
     obtenerJuegosID,
     obtenerJuegos,
     obtenerTermino,
     actualizarJuegos,
     borrarProductos
     
 }
