export default {
    name: "_connected",
    async execute(data) {
        data.tb.socket.emit("user joined", data.tb.genName(), data.tb.color, "", "");

        if (data.tb.room !== "atrium") {
            data.tb.sendMessage(`/room ${data.tb.room}`);
        }

        console.log(`Logged in to Trollbox as ${data.tb.genName()}`);
    },
};