const { Sequelize, DataTypes } = require('sequelize');
const database = require('./database');

const Filmes = database.sequelize.define("filmes", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    ano:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    fase:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    imagem:{
        type: Sequelize.STRING,
        allowNull: false,
    },
},{
    freezeTableName: true,
    timestamps: false, 
    createdAt: false,
    updatedAt: false,
})

Filmes.sync({ force: false });
module.exports = Filmes;