const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const bodyParser = require('body-parser');
const { error } = require('console');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname+'/dist/patitasweb/));

app.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/dist/patitasweb/index.html'));
});

const Pool = require("pg").Pool;
const connection = new Pool({
  user: "zdyhcvwqyathgx",
  host: "ec2-54-211-74-66.compute-1.amazonaws.com",
  database: "d1hnq79hlil831",
  password: "8c719c5fc9f935623ffa1989146fbe5de6ff14d0b5eabaaae9f9986688c6f1de",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
 }
});

app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));

connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
});


app.get('/api/patas', (req,res) =>{
    res.send('Welcome api patitas');
});

app.get('/api/consult/:usuario', (req,res) =>{
    const  { usuario } = req.params;
    const sql = `SELECT * FROM mascotas where status = 'A' AND usuario = '${usuario}'`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json(null);
        }
    })
  //  res.send('Lista mascotas');
});

app.get('/api/buscar/:id', (req,res) =>{

    const  { id } = req.params;
    const sql = `SELECT * FROM mascotas Where id_mascota = ${id}`;
    //res.send('insertar api patitas');
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json('nada');
        }
    })
});


app.post('/api/registrar', (req,res) =>{
    const{nombre,tipo,edad,usuario} = req.body;
    const sql = `insert into mascotas(nombre,tipo,edad, usuario,status) values('${nombre}','${tipo}',${edad},'${usuario}','A')`;
    connection.query(sql,(error,results)=>{
        if(error) throw error
        else{
            res.json({status : 'mascota agregada'})
        }

    })
});

app.get('/api/eliminar/:id', (req,res) =>{

    const  { id } = req.params;
    let sql = `update mascotas set 
    status = 'B'
    where id_mascota = '${id}'`
    connection.query(sql,(error,results)=>{
        if(error) throw error
        else{
            res.json({status : 'mascota eliminada'})
        }

    })
});

app.put('/api/editar/:id', (req,res) =>{
    const{id} = req.params;
    const{nombre,tipo,edad} = req.body;
    let sql = `update mascotas set 
    nombre = '${nombre}',
    tipo = '${tipo}',
    edad = ${edad}
    where id_mascota = '${id}'`

    connection.query(sql,(error,results)=>{
        if(error) throw error
        else{
            res.json({status:'mascota editada'})
        }
    }
    );
});

app.post('/api/login', (req,res) =>{
    const{usuario,contra} = req.body;
    const sql = `SELECT * from usuarios where (usuario = '${usuario}' AND contra = '${contra}')`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json({status:'iniciaste sesion', user:usuario})
        }else{
            res.json({status:'nada'})
        }
    })
});

app.post('/api/agendarcita', (req,res) =>{
    const{idcita,usuario} = req.body;
    let sql = `update citas set 
    status = 'P',
    usuario = '${usuario}'
    where idcita = '${idcita}'`
    connection.query(sql,(error,results)=>{
        if(error) throw error
        else{
            res.json({status : 'fecha agendada'})
        }

    })
});

app.get('/api/citasdisp/', (req,res) =>{
   // const  { usuario } = req.params;
    const sql = `SELECT * FROM citas where status = 'A' AND fecha > NOW() LIMIT 7`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json('nada');
        }
    })
  //  res.send('Lista mascotas');
});

app.get('/api/miscitas/:usuario', (req,res) =>{
    const  { usuario } = req.params;
    const sql = `SELECT * FROM citas where status = 'P' AND usuario = '${usuario}' AND fecha > NOW()`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json(null);
        }
    })
  //  res.send('Lista mascotas');
});

app.get('/api/cancelarcita/:idcita', (req,res) =>{
    const{idcita} = req.params;
    let sql = `update citas set 
    status = 'A',
    usuario = ''
    where idcita = '${idcita}'`;
    connection.query(sql,(error,results)=>{
        if(error) throw error
        else{
            res.json({status : 'cita cancelada'})
        }

    })
});

app.post('/api/regicuenta', (req,res) =>{
    const{nombre,contra,usuario,correo} = req.body;
    const sql = `insert into usuarios(nombre,contra,usuario, correo) values('${nombre}','${contra}','${usuario}','${correo}')`;
    connection.query(sql,(error,results)=>{
        if(error) throw error
        else{
            res.json({status : 'cuenta agregada'})
        }

    })
});

app.get('/api/buscaruser/:usuario', (req,res) =>{
    const  { usuario } = req.params;
    const sql = `SELECT usuario FROM usuarios where usuario = '${usuario}'`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json(null);
        }
    })
});

app.get('/api/cartilla/:idmascota', (req,res) =>{
    const  { idmascota } = req.params;
    const sql = `SELECT * FROM vacunas where idmascota = '${idmascota}'`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json(null);
        }
    })
});

app.get('/api/validarcita/:usuario', (req,res) =>{
    const  { usuario } = req.params;
    const sql = `SELECT * FROM citas where usuario = '${usuario}' AND status = 'P' AND fecha > NOW()`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json(null);
        }
    })
});



