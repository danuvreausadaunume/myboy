const Discord = require("discord.js");
const fs = require("fs");
const moment = require("moment");
const ms = require("ms");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const colors = require("colors");
let dev = "463024524263161877";

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.".red);
    return;
  }

  console.log("——————————————————————————————————————".green);
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`[———] ${f} has been loaded! [———]`.green);
    bot.commands.set(props.help.name, props);
  });
})

bot.on("ready", async () => {
  console.log("——————————————————————————————————————".green);
  console.log("Ready boys..");

});

bot.on('guildMemberAdd', member => {
  member.guild.channels.get('465588181320859649').setName(`🌐 Total Members: ${member.guild.memberCount}`)

  member.guild.channels.get('465588255715229716').setName(`👥 Newest: ${member.user.username}`)

  member.guild.channels.get('465588423705493504').setName(`⭐ Goal: ${member.guild.memberCount}/300`)

    let canal = member.guild.channels.find('id', '465565762271051792');
    canal.send("[**+**] " + member.user.tag + "");
});

bot.on('guildMemberRemove', member => {
  member.guild.channels.get('465588181320859649').setName(`🌐 Total Members: ${member.guild.memberCount}`)

  member.guild.channels.get('465588423705493504').setName(`⭐ Goal: ${member.guild.memberCount}/300`)

    let canal = member.guild.channels.find('id', '465565762271051792');
    canal.send("[**-**] " + member.user.tag + "");
});

bot.on("messageUpdate", (oldMessage, newMessage) => {

const message = newMessage;
  
  if(message.content.includes(".gg")) {
    if(message.member.hasPermission("ADMINISTRATOR")) return;
    message.reply("reclama nu e permisa.");
    message.delete();
    }
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  const ceva = ["https://", "http://", "www.", "discord.gg", ".gg", ".rip", ".me"];
  if(ceva.some(cuvant => message.content.includes(cuvant)) ) {
    if(message.member.hasPermission("ADMINISTRATOR")) return;
    message.channel.send("<:tickNu:465573731557834762> | Reclama nu e permisa, " + message.author + ".");
   message.delete();
 }
  if(message.content.indexOf("-") !== 0) return;

  let prefix = "-";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  });

bot.login(process.env.TOKEN);
