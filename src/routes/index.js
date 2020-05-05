const express = require('express');
const producto = require('../model/product.js');//schema
const faker = require('faker');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/agregar-producto', (req, res) => {
    res.render('add-product');
});

router.post('/agregar-producto', async (req, res) => {
    const guardar = new producto();
    guardar.categoria = req.body.categoria;
    guardar.nombre = req.body.nombre;
    guardar.precio = req.body.precio;
    guardar.cover = faker.image.image();
    await guardar.save();
    console.log('guardado!');
    res.redirect('/agregar-producto');   
});

router.get('/productos/:page', (req, res, next) =>{
    let paginas = 9; //cuantas paginas quieres
    let page = req.params.page || 1; //en que pagina esta el usuario o si no hay por defecto 1
    producto
        .find({})//que busque todo los datos
        .skip((paginas * page) - paginas) //formula necesaria para que calcule los datos
        .limit(paginas) //cuantos datos quieres por pagina
        .exec((err, productos) => {//ejectuo la consulta
            producto.count((err, count) =>{
                if (err) return next(err);
                res.render('productos', {
                    productos,
                    current: page,
                    pages: Math.ceil(count / paginas)
                });
            });
        }); 
});

router.get('/generar', async (req, res) => {
    for (let i = 0; i < 90; i++) {
        const guardar = new producto();
        guardar.categoria = faker.commerce.department();//me generará categorias aleatorios
        guardar.nombre = faker.commerce.productName();// nombres aleatorios
        guardar.precio = faker.commerce.price();
        guardar.cover = faker.image.image();
        await guardar.save();
    }
    res.redirect('/');
});

module.exports = router;