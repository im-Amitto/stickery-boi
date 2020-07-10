const commando = require('discord.js-commando');
const fetch = require('node-fetch');
var giphy_api_key = process.env.GIPHY_API_KEY;

var name = "sticker"
module.exports = class RStickerCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'rsticker',
            aliases: [],
            group: 'media',
            memberName: 'rsticker',
            description: "Get a random GIPHY sticker.",
            details: "Get a random GIPHY sticker.",
            examples: ["rsticker"]
        });
    }

    async run(msg, args) {
        msg.reply("Getting you a random sticker from GIPHY...")
        var giphy_endpoint = `https://api.giphy.com/v1/stickers/random?rating=g&api_key=${giphy_api_key}`

        fetch(giphy_endpoint)
            .then(res => res.json())
            .then((out) => {
                console.log(out)
                var giphy_link = out.data.embed_url;
                console.log(giphy_link)
                msg.reply(giphy_link)
                // Send an embed with a local image inside
                msg.channel.send({
                    files: [
                        "media/powered_by_giphy.png",
                    ]
                })
                    .catch(console.error);

            })
            .catch(err => { throw err });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
