
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
var name = "replace-b"
const sql = require("sqlite");
sql.open("./database.sqlite3");

module.exports = class ReplaceBCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'replace-b',
            aliases: [],
            group: 'message_formatting',
            memberName: 'replace',
            description: "Replaces all b emoji.",
            details: oneLine`
            Replaces all b emoji.
			`,
            examples: ["replace-b look at the b's everyone"],

            args: [
                {
                    key: 'text',
                    prompt: "What text would you like to convert to replace the B's of?",
                    type: 'string'
                }
            ]

        });
    }

    async run(msg, { text }) {

        var string = text.toLowerCase();

        var reply = "";
        var letter;
        var emoji_string = ""
        for (var i = 0; i < string.length; i += 1) {
            letter = string[i];
            if (letter === "b") {
                var b_emoji = `:b:`;
                emoji_string += b_emoji;
            }
            else {
                emoji_string += letter;
            }

        }
        reply = emoji_string

        return msg.reply(reply);
    }
};
