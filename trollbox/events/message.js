import { tb, TbMessage } from '../../index.js';
import { clean, createSplicedMessage, censor } from '../../common-functions.js';

export default {
    name: "message",
    async execute(message) {

        if (!tb.blocked.home.includes(message.home) &&
        !tb.blocked.nick.includes(message.nick) &&
        !tb.blocked.color.includes(message.color)) {

            let cleanMessage = clean(message.msg);

            if (cleanMessage.startsWith(tb.prefix)) {

                const spacePos = cleanMessage.indexOf(" ");
                const commandString = (spacePos >= 0) ? cleanMessage.substring(1, spacePos).toLowerCase() : cleanMessage.substring(1).toLowerCase();
                const args = (spacePos >= 0) ? cleanMessage.substring(spacePos + 1).split(" ") : undefined;

                const command = tb.commands[commandString];

                if (command && tb.commandsEnabled) {

                    const now = Date.now();

                    // Local cooldowns
                    let localTimestamps = tb.localCooldowns[commandString];
                    const defaultLocalCooldownDuration = 0;
                    const localCooldownAmount = (command.localCooldown ?? defaultLocalCooldownDuration) * 1000;

                    if (!localTimestamps) {
                        localTimestamps = {};
                    }


                    if (localTimestamps[message.home]) {
                        const expirationTime = localTimestamps[message.home] + localCooldownAmount;

                        if (now < expirationTime && !(command.name == "chat" && tb.chatbot == true)) {
                            tb.sendMessage(`You can use ${tb.prefix + command.name} again in ${(expirationTime - now) / 1000} seconds.`);
                            return;
                        }
                    }

                    localTimestamps[message.home] = now;
                    setTimeout(() => delete localTimestamps[message.home], localCooldownAmount);

                    // Global cooldowns
                    const globalTimestamp = tb.globalCooldowns[commandString];
                    const defaultGlobalCooldownDuration = 0;
                    const globalCooldownAmount = (command.cooldown ?? defaultGlobalCooldownDuration) * 1000;

                    if (globalTimestamp) {
                        const expirationTime = globalTimestamp + globalCooldownAmount;

                        if (now < expirationTime && !(command.name == "chat" && tb.chatbot == true)) {
                            tb.sendMessage(`You can use ${tb.prefix + command.name} again in ${(expirationTime - now) / 1000} seconds.`);
                            return;
                        }
                    }

                    tb.globalCooldowns[commandString] = now;
                    setTimeout(() => delete tb.localCooldowns[commandString], globalCooldownAmount);

                    try {
                        await command.execute(message, args);
                    } catch (error) {
                        tb.sendMessage('There was an error while executing this command!');
                        console.error(error);
                    }

                }

            }
            if (cleanMessage.search(/meow/gi) >= 0 || cleanMessage.search(/nya/gi) >= 0) {
                tb.sendMessage("Nya~");
            }
            if (message.nick !== "Hibot" &&
                message.nick !== "anonymous" &&
                clean(message.msg).length <= 1000 &&
                clean(censor(clean(message.msg), "omit", "link", "ping")).length >= 1 == true) {

                tb.sendTbMessageToDiscord(message);

                console.log(`[trollbox: ${clean(tb.room)}] ${clean(message.nick)}: ${clean(message.msg)}`);

                if (message.msg.split(" ").length >= 4 &&
                    message.msg.split(" ").length <= 25 &&
                    message.nick !== tb.genName()) {

                    const loggedMessage = TbMessage.create({
                        content: clean(message.msg),
                        home: message.home,
                        nick: clean(message.nick),
                    })
                }

                if (tb.chatbot == true &&
                    message.nick !== tb.genName()
                ) {

                    createSplicedMessage(clean(message.msg), TbMessage).then(
                        function (message) { tb.sendMessage(censor(message, "omit", "gayleb")); }, function (error) { console.error(error) }
                    )

                }

            }
        }

    },
};