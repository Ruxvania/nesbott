import path from 'path';
import { fileURLToPath } from 'url';
import { Op } from 'sequelize';
import { decode } from "html-entities";
import config from './config.json' with {type: 'json'};


export function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateNyaReply() {
    const replyPrefixes = ["Nya", "Meow", ":3"];
    const replySuffixes = ["~", "?", "!"];
    const randomReply = replyPrefixes[getRandomInteger(0, replyPrefixes.length - 1)] + replySuffixes[getRandomInteger(0, replySuffixes.length - 1)];
    return randomReply;
};

export function clean(message) {
    message = message.trim();
    message = decode(message);
    message = message.replace(/<\/?[a-z][a-z0-9]*[^<>]*>|<!--.*?-->/img, "");
    return message;
}

export function isArgsVaild(array) {
    if (!Array.isArray(array) || !array.length) {
        return false;
    } else if (typeof array[0] == "string") {
        if (array[0].replace(/\s{1,}/g, "") == "") {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

export function isStringVaild(string) {
    if (typeof string === 'string' || string instanceof String) {
        if (string.replace(/\s{1,}/g, "") == "") {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

export function censor(message, omitOrReport, ...filters) {
    const filterRegex = {
        banned: /discord|sonic|fortnite|among us|corona|roblox/gi,
        hardbanned: /exe|forkie|runkit\.sh|^\*hugs|discord|big|https/img,
        link: /(?:http[s]?:\/\/.)?(?:www\.)?[-a-zA-Z0-9@%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/gm,
        gayleb: /^\s*![a-zA-Z]*/gm,
        ping: /@everyone|@here|<@[0-9]+>/gi,
        tbcommand: /^\/\S+/img
    }

    switch (omitOrReport) {
        case "omit":
            omit();
            break;
        case "report":
            report();
            break;
        default:
            report();
    }

    function omit() {
        filters.forEach(
            (filter) => { message = message.replace(filterRegex[filter], ""); }
        );
    }

    function report() {
        let match = false;
        filters.forEach(
            (filter) => {
                if (isArgsVaild(message.match(filterRegex[filter]))) {
                    match = true;
                }
            }
        );
        message = match;
    }

    return message;
}

export function arrayToString(array) {
    let string = ""
    array.forEach(function (value, i) {
        if (i == 0) {
            string = value;
        } else {
            string = string + " " + value;
        }
    })
    return string;
}

export function combineMessages(message1, message2, combineWord) {
    message1 = message1.split(" ");
    message2 = message2.split(" ");
    combineWord = combineWord ?? message1.at(getRandomInteger(0, message1.length - 1));
    let combineWordSearchResult = -1;

    for (let i = 0; i < message2.length; i++) {
        if (message2[i].toLowerCase() == combineWord.toLowerCase()) {
            combineWordSearchResult = i;
        }
    }

    if (combineWordSearchResult == -1) {
        throw ("Splicing failed");
    } else {
        let result = " ";
        for (let i = 0; i < message1.length; i++) {
            if (message1[i] == combineWord) {
                i = message1.length;
            } else {
                result = result + " " + message1[i];
            }
        }
        for (let i = combineWordSearchResult; i < message2.length; i++) {
            result = result + " " + message2[i];
        }
        return (result);
    }
}

export async function createSplicedMessage(message, Database, splices, tries) {
    tries = tries === undefined ? 5 : tries;
    let messageResult;
    for (let i = 1; i <= tries; i++) {
        try {
            let recievedMessageArray = message.split(" ");
            let recievedMessageWord = recievedMessageArray.at(getRandomInteger(0, recievedMessageArray.length - 1));

            splices = splices === undefined ? 3 : splices;

            const messageListA = await Database.findAll({
                attributes: ['content'],
                where: {
                    content: {
                        [Op.like]: `%${recievedMessageWord}%`,
                        [Op.notLike]: `${message}`,
                    },
                },
            });
            const messageArrayA = messageListA.map(text => text.content) || 'No messages logged.';
            const messageStringA = messageArrayA.at(getRandomInteger(0, messageArrayA.length - 1))
            if (messageStringA == "" || messageStringA == " " || typeof messageStringA == "undefined") {
                throw "Nothing returned";
            }

            const messageStringArrayA = messageStringA.split(" ");
            const messageStringWordA = messageStringArrayA.at(getRandomInteger(0, messageStringArrayA.length - 1));
            const messageListB = await Database.findAll({
                attributes: ['content'],
                where: {
                    content: {
                        [Op.and]: [
                            { [Op.notLike]: `${messageStringA}` },
                            { [Op.notLike]: `${message}` },
                            { [Op.like]: config.onlyUseFirstWord ? `%${recievedMessageWord}%` : `%${messageStringWordA}%` }
                        ]
                    },
                },
            });
            const messageArrayB = messageListB.map(text => text.content) || 'No messages logged.';
            const messageStringB = messageArrayB.at(getRandomInteger(0, messageArrayB.length - 1))
            if (messageStringB == "" || messageStringB == " " || typeof messageStringB == "undefined") {
                throw "Nothing returned";
            }

            messageResult = combineMessages(messageStringA, messageStringB, config.onlyUseFirstWord ? recievedMessageWord : messageStringWordA).trim();

            if (isStringVaild(messageResult) == false) {
                throw "Nothing returned";
            }

            if (splices >= 2) {

                for (i = 2; i <= splices; i++) {

                    try {
                        let recievedMessage = messageResult;
                        let recievedMessageArray = recievedMessage.split(" ");
                        let recievedMessageWord = recievedMessageArray.at(getRandomInteger(0, recievedMessageArray.length - 1));

                        const messageListA = await Database.findAll({
                            attributes: ['content'],
                            where: {
                                content: {
                                    [Op.like]: `%${recievedMessageWord}%`,
                                    [Op.notLike]: `${recievedMessage}`,
                                },
                            },
                        });

                        const messageArrayA = messageListA.map(text => text.content) || 'No messages logged.';
                        const messageStringA = messageArrayA.at(getRandomInteger(0, messageArrayA.length - 1))
                        if (messageStringA == "" || messageStringA == " " || typeof messageStringA == "undefined") {
                            throw "Nothing returned";
                        }

                        let combinedMessages = combineMessages(messageStringA, messageStringB, config.onlyUseFirstWord ? recievedMessageWord : messageStringWordA).trim();
                        if (isStringVaild(combinedMessages) == false) {
                            throw "Nothing returned";
                        }

                        messageResult = combinedMessages;
                    } catch (error) {

                    }

                }

            }

            return messageResult;

        } catch (error) {

            if (i >= tries && error == "Nothing returned") {
                throw "Nothing returned";
            } else {
                throw error;
            }

        }
    }
}

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);














