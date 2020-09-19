const Discord = require("discord.js");
const axios = require('axios').default;

const client = new Discord.Client();

const {
    account_token
} = require("./config.json")

client.on('ready', () => {
    console.log(`Loading sniper on ${client.user.tag}, waiting for target.`);
});

client.on('message', message => {
    if(message.content.includes('discord.gift') || message.content.includes('discordapp.com/gifts/')) {

        var Nitro = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/

        var NitroUrl = Nitro.exec(message.content);
        var NitroCode = NitroUrl[0].split('/')[1];

        console.log(`A Nitro was found in ${message.guild.name}. Lining up shot.`);

        axios({
            method: 'POST',
            url: `https://discordapp.com/api/v6/entitlements/gift-codes/${NitroCode}/redeem`,
            headers:
            {
                'Authorization': client.account_token
            }
        }).then(
            () => console.log(`Successfully redeemed a nitro that was found in ${message.guild.name}. Target down.`)

        ).catch(ex => console.log(`Couldn't claim Nitro. Link is expired, fake or it's already claimed!`))

    }
})

client.login(account_token)