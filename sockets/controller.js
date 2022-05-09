

const socketController = (socket) =>{
    console.log('Cliente conectado', socket.id);
    socket.on('disconnect', ()=>{
        console.log('Cliente desconectado',socket.id);
    });

    socket.on('enviar-mensaje', async(payload, callback)=>{
        //*Async para agregar en la base de datos
        const id = 123456;
        callback( id );
        //console.log('Enviar mensaje desde el server: recibido',payload);
        //socket.emit('enviar-mensaje', payload); //* Aquí le emite al mismo socket que envío el mensaje
        socket.broadcast.emit('enviar-mensaje', payload); //*Aquí con broadcast le envíamos al resto
    });
};

module.exports = {
    socketController
};