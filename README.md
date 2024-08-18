# Nesbott
Chatbot for Discord and Trollbox. Nesbott works by splicing together logged messages.

## History
Kevin (AtLeastK) had a website called spooks.me. Spooks was a visual chat website with customizable avatars and tilesets, and Kevin had coded a chatbot for it called Mrs. Nesbott. Sometimes, it was run under the name Separatrix with a robot avatar instead of a french maid avatar. Eventually, Spooks was shut down, but I don't remeber for sure why. It might have been that Kevin's brother, InfraRaven, had some sort of disagreement with Kevin about Spooks. Kevin, disappointed that he could not run Spooks as he wanted to, shut it down as punishment. It also might have been that Kevin got annoyed with some of the people on Spooks, and decided to shut it down as punishment. I eventually started talking with Kevin about Nesbott, and he told me how it worked. He said that he got the idea for Nesbott from an IRC channel's chatbot that someone showed him. I eventually started coding a new Nesbott for Discord, and then Trollbox, as I missed being able to talk to Nesbott on Spooks.

## Nesbott 0.1:
This is the first version of the bot. It was coded based off of the Discord.JS guide and Magestick's Trollbox template bot, and it was started on ~2024/5/30.

## Separatrix X - 2024/6/23
This version of the bot was made from 0.1 for testing.

## Nesbott 0.2 - 2024/6/23
In this version of the bot, the Trollbox code was refactored a ton, and command cooldowns were also added for the Trollbox bot.

## Nesbott 0.3 - 2024/6/24
The bot was converted to ESM, disconnects from TB are now reconnected from, and the numerous censor/trigger functions were refactored into a single function, and the bot is now not able to use a gayleb command in any way.

## Nesbott 0.4 - 2024/6/27
### Features/fixes
- Client-side and server-side banned words were separated and more were added.
- The block system was revamped and now blocks can be changed during runtime.
- The commands pong, ogname, ogroom, disc, and block were added.
- The reload command was fixed.
- The chat command was renamed to `c` and the bot's default room is now `bot` due to Jaken's block.
- The deploy-commands script was fixed.

### Known bugs
- The room command sometimes goes to a room but with whitespace around it.
- Discord blocking is not enforced yet.
- The atrium restrictions dont work.
