const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
require('dotenv').config()

const PORT = 8800;
const app = express();

const db = mysql.createConnection({
    host: process.env.HOST,   
    user: process.env.USER, 
    password: process.env.PASSWORD, 
    database: process.env.DATABASE 
  });

  app.use(express.json());
  app.use(cors());

app.get("/", (req, res) => {
    res.json('Olá, este é o backend');
});

app.get("/livros", (req,res) => {
    const q = "SELECT * FROM livros"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/livros",(req, res) => {
    const q = "INSERT INTO livros (`titulo`,`desc`,`img`,`preco`) VALUES (?)";
    const values = [
        req.body.titulo,
        req.body.desc,
        req.body.img,
        req.body.preco

    ];
    db.query(q,[values],(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(PORT, () => {
    console.log('conectado ao backend');
});