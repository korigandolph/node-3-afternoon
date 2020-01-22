require ('dotenv').config()
const express=require('express');
const massive = require('massive');

const app = express();

const {SERVER_PORT, CONNECTION_STRING}= process.env;
const ctrl = require('./products_controller')

massive(CONNECTION_STRING).then(dbInstance =>{
    app.set('db', dbInstance);
    console.log('db is connected')
    app.listen(SERVER_PORT, ()=>{
        console.log(`Server listening on ${SERVER_PORT}`)
    })
}).catch(err=>console.log(err));


app.use(express.json());

app.post('/api/products', ctrl.create);
app.get('/api/products', ctrl.getAll);
app.put('/api/products/:id', ctrl.update);
app.get('/api/products/:id', ctrl.getOne);
app.delete('/api/products/:id', ctrl.delete);
