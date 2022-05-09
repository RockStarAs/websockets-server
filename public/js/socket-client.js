//Referencias del HTML
const lblOnline     = document.querySelector('#lblOnline');
const lblOffline    = document.querySelector('#lblOffline');
const txtMensaje    = document.querySelector('#txtMensaje');
const btnEnviar     = document.querySelector('#btnEnviar');

//*Socket del cliente, que usa la web
const socket = io();


socket.on('connect',()=>{
    console.log('Conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = 'block';
});

socket.on('disconnect',()=>{
    console.log('Desconectado del servidor');
    lblOffline.style.display = 'block';
    lblOnline.style.display = 'none';
});

socket.on('enviar-mensaje',(payload)=>{
    console.log(payload);    
});

btnEnviar.addEventListener('click', ()=>{
    const mensaje = txtMensaje.value;

    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload , (id)=>{
        console.log('Desde el server',id);
    });
    txtMensaje.value = '';
});
