const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

//const {dbConnection} = require('../database/config');
class Server {

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);

        this.paths = {
        };

        //*Conectar a la base de datos
        //this.conectarDb();

        //*Middlewares
        this.middleware();
    
        //*Rutas de la aplicación
        this.routes();

        //* Sockets
        this.sockets();
    }

    async conectarDb(){
        //await dbConnection();
    }

    middleware(){
        //*CORS
        this.app.use( cors() );

        //*Parseo y lectura del body (POSTS parametros)
        //this.app.use( express.json() );

        //*Directorio público
        this.app.use( express.static('public') );

    }

    routes(){
        //this.app.use(this.paths.auth, require('../routes/auth.route'));
    }

    sockets(){
        this.io.on('connection', socketController);
    }

    listen(){
        this.server.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
};

module.exports = Server;