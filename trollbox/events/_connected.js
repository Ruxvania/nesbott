import { tb } from '../../index.js';

export default {
    name: "_connected",
    async execute(data) {
        tb.socket.emit("user joined", tb.genName(), tb.color, "", "");

        if (tb.room !== "atrium") {
            tb.sendMessage(`/room ${tb.room}`);
        }

        console.log(`Logged in to Trollbox as ${tb.genName()}`);
    },
};