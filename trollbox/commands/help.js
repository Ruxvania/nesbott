import fs from 'node:fs';
import path from 'node:path';
import { censor } from '../../common-functions.js';
import config from "../../config.json" with { type: "json" };

export default {
  cooldown: 60,
  name: "help",
  description: 'View all commands and info about the bot.',
  async execute(data, message, args) {

    const helpHeader = fs.readFileSync(path.join(import.meta.dirname, "help-header.txt"), "utf8").trim();

    let helpFooter = fs.readFileSync(path.join(import.meta.dirname, "help-footer.txt"), "utf8").trim();

    helpFooter = config.version + "\n" + helpFooter;

    let commands = "";
    for (let command in data.tb.commands) {
      commands += "\n" + data.tb.prefix + data.tb.commands[command].name + " - " + data.tb.commands[command].description;
      commands = commands.trim();
    };

    data.tb.sendMessage(censor(helpHeader + '\n\n' + commands + "\n\n" + helpFooter, "omit", "tbServerMessageBan"));
  },
};