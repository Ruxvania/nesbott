import { REST, Routes } from 'discord.js';
import config from './config.json' with {type: 'json'};

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.token);

rest.put(Routes.applicationCommands(config.clientId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);