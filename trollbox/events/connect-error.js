export default {
    name: "connect_error",
    async execute(data, error) {
            if (data.tb.socket.active) {
              // temporary failure, the socket will automatically try to reconnect
            } else {
              // the connection was denied by the server
              // in that case, `socket.connect()` must be manually called in order to reconnect
              console.error(error);
              data.tb.socket.connect();
            }
    },
};