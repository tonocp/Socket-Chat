const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');

const socketController = async (socket = new Socket()) => {
  const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
  if (!usuario) {
    return socket.disconnect();
  }
  console.log(`${usuario.nombre} se ha conectado`);
};

module.exports = {
  socketController,
};
