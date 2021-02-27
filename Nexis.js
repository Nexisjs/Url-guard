const Discord = require('discord.js');
const request = require('request');

let ayarlar = {
    "özelurl": "url değişince yapılcak url",
    "urlog": "botun mesaj atacağı guard log id",
    "token": "botunuzun tokeni"///Nexis.#0001
}

client.on('guildUpdate', async (nexis, aksoy) => {
    if (nexis.vanityURLCode === aksoy.vanityURLCode) return;
    let entry = await aksoy.fetchAuditLogs({
        type: 'GUILD_UPDATE'
    }).then(audit => audit.entries.first());
    if (!entry.executor || entry.executor.id === client.user.id) return;
    let channel = client.channels.cache.get(Options.urlog);

    if (channel) channel.send(`
    ${entry.executor} adlı kullanıcı özel url'yi değiştirmeye çalıştı ve sunucudan yasaklandı.
    `)

    if (!channel) aksoy.owner.send(`
    ${entry.executor} adlı kullanıcı özel url'yi değiştirmeye çalıştı ve sunucudan yasaklandı.
    `)

    aksoy.members.ban(entry.executor.id, {
        reason: `${entry.executor.tag} URL GUARD`
    });

    const ayarlar = {
        url: `https://discord.com/api/v6/guilds/${aksoy.id}/vanity-url`,
        body: { code: ayarlar.özelurl },
        json: true,
        method: 'PATCH',
        headers: { "Authorization": `Bot ${ayarlar.token}` }
    };

    request(ayarlar, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
    });
});
