import fs from 'node:fs';
import path from 'node:path';
import { tb } from '../../index.js';
import { __dirname } from '../../common-functions.js';
import config from "../../config.json" with { type: "json" };

export default {
  cooldown: 30,
  name: "help",
  description: 'View all commands and info about the bot.',
  async execute(message, args) {

    const helpHeader = fs.readFileSync(path.join(__dirname, "trollbox/commands/help-header.txt"), "utf8").trim();

    let helpFooter = fs.readFileSync(path.join(__dirname, "trollbox/commands/help-footer.txt"), "utf8").trim();

    helpFooter = config.version + "\n" + helpFooter;

    let commands = "";
    for (let command in tb.commands) {
      commands += "\n" + tb.prefix + tb.commands[command].name + " - " + tb.commands[command].description;
      commands = commands.trim();
    };

    tb.sendMessage(helpHeader + '\n\n' + commands + "\n\n" + helpFooter);
  },
};