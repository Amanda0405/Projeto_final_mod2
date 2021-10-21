const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config();
app.use(express.static(path.join(__dirname,"public")));
const db = require('./Model/Database');
const Filmes = require("./Model/filmes");

let mensagem = "";


app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  const filmes = await Filmes.findAll();
  setTimeout(() => {mensagem ="";}, 5000);
  res.render("../views/lista", {mensagem, filmes: filmes})
});
   
   app.post("/lista", async (req, res) => {
     const filmes = await Filmes.findAll();
     res.render("../views/lista")
    });

    app.get("/criar", (req, res) => {
      res.render("../views/criar");
    });
    
     app.post("/criar", async (req, res) => {  
       const {nome,ano, fase,imagem} = req.body;
       await Filmes.create({
        nome:nome, 
        ano:ano,
        fase:fase,
        imagem:imagem
      })
      mensagem = `O Filme ${nome} foi adicionado`
      res.redirect("/")})
      
      app.get("/lista/:id", async (req, res) => {
        const filmes = await Filmes.findByPk(req.params.id);
        res.render("../views/detalhes", {filmes:filmes});
      });
      app.get("/detalhes/:id", async (req, res) => {
        const filme = await Filmes.findByPk(req.params.id);
        console.log(filme);
        res.render("../views/detalhes", {filme:filme});
      });
      app.get('/editar/:ID', async (req,res) => {
        const filmes = await Filmes.findByPk(req.params.id);
        
        if (!filmes) {
          res.render("../views/editar", {
            mensagem: "Filme não encontrado!",
          });
        }
        res.render("../views/editar",
        {filmes: filmes});
      });
      app.post("/editar/:ID", async (req,res) => {
        const filmes = await Filmes.findByPk(req.params.id);
        const { nome, ano, fase, imagem, genero, diretor,descricao} = req.body;
        filme.id = req.params.id;
        filme.nome = nome;
        filme.ano = ano;
        filme.fase = fase;
        filme.imagem = imagem;
        filme.genero = genero;
        filme.diretor = diretor;
        filme.descricao = descricao;
        
        const filmeEditado = await Filmes.save();
        res.render("editar", {filme: filmeEditado,
          mensagem: "Filme editado com sucesso!" });
        });
        
        app.get("/deletar/:id", async (req, res) => {
          const filmes = await Filmes.findByPk(req.params.id);
          if (!filmes) {
            res.render("../views/deletar",{
              mensagem: "Filme não encontrado!",});
        }
        res.render("../views/deletar", {filmes:filmes});
      });
      
      app.post("/deletar/:id", async (req, res) => {
        const filmes = await Filmes.findByPk(req.params.id);
        if (!filmes) {
          res.render("../views/deletar", {filmes:filmes,
            mensagem: "Filme não encontrado!",});
          }
          
          await filmes.destroy();
          res.render("../views/lista", { mensagem: `Filme ${filmes.nome} deletado com sucesso!`,  });
        });
        console.log(__dirname);
        app.listen(port, ()=>console.log(`Servidor rodando em http://localhost:${port}`));