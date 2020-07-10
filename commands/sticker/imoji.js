const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const fetch = require("node-fetch");
var fs = require("fs");

var name = "imoji";
var contents = fs.readFileSync(__dirname + "/meme.json");
var collection = JSON.parse(contents);
module.exports = class imojiCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "imoji",
      aliases: [],
      group: "sticker",
      memberName: "imoji",
      description: "Personal Imoji Fucker.",
      details: oneLine`
            Personal Imoji Fucker.
			`,
      examples: ["imoji"],
    });
  }

  async run(msg, args) {
    var arg = args.split(" ");
    if (arg.length == 1) {
      if (collection[arg[0]]) {
        msg.channel.send({
          embed: {
            image: {
              url: collection[arg[0]],
            },
          },
        });
      } else if(arg[0] == "help"){
        msg.channel.send({
          embed: {
            color: "1211996",
            description: "Available commands are: "+Object.keys(collection).join(","),
          },
        });
      } else {
        msg.channel.send({
          embed: {
            color: "1211996",
            description: "Kya dekhega MC, kuch nhi h",
          },
        });
      }
    } else if (arg.length == 3) {
      if (arg[0] == "add") {
        collection[arg[1]] = arg[2];
        fs.writeFileSync(__dirname + "/meme.json", JSON.stringify(collection, null, 2) , 'utf-8'); 
        msg.channel.send({
          embed: {
            color: "1211996",
            description: "Done! Now you can use, imoji " + arg[1],
          },
        });
      } else {
        msg.channel.send({
          embed: {
            color: "1211996",
            description: "Ek keech ke lafa dunga",
          },
        });
      }
    } else {
      msg.channel.send({
        embed: {
          color: "1211996",
          description: "Command bhi dangh se nhi likh sakta laude",
        },
      });
    }
  }
};
