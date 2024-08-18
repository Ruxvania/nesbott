import { tb } from '../../index.js';

export default {
    name: "disconnect",
    async execute(reason) {
        if (tb.socket.active) {
            // temporary disconnection, the socket will automatically try to reconnect
          } else {
            // the connection was forcefully closed by the server or the client itself
            // in that case, `socket.connect()` must be manually called in order to reconnect
            console.log(reason);
            tb.socket.connect();
          }
    },
};