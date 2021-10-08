const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;;


app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded());

app.get("/", function(req, res){
   res.render("lista")
}); 

app.get("/criar", function(req, res){
    res.render("criar")
 }); 
 

app.get("/deletar", function(req, res){
   res.render("deletar");
});

app.post("/detalhes", (req, res) => {
   res.render("detalhes")
});

app.get("/editar", (req, res) => {
    res.render("editar")
   });


 console.log(__dirname);
app.listen(port, ()=>console.log(`Servidor rodando em http://localhost:${port}`));