module.exports.config = {
	name: "help",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Hướng dẫn cho người mới",
	commandCategory: "system",
	usages: "help [Text]",
	cooldowns: 5,
	info: [
		{
			key: 'Text',
			prompt: 'Là lệnh bạn cần biết thêm thông tin chi tiết.',
			type: 'Văn Bản',
			example: 'help'
		}
	]
};

module.exports.run = function({ api, event, args, client, global }) {
	const command = client.commands.get(args[0]);
	const threadSetting = client.threadSetting.get(event.threadID.toString()) || {};
	
	if (!command) {
		const commands = client.commands.values();
		var group = [], msg = "";
		for (const commandConfig of commands) {
			if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
			else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
		}
		group.forEach(commandGroup => msg += `『 ${commandGroup.group.charAt(0).toUpperCase() + commandGroup.group.slice(1)} 』\n${commandGroup.cmds.join(', ')}\n\n`);
		return api.sendMessage(msg + `[ 𝙎𝙪̛̉ 𝙙𝙪̣𝙣𝙜 : "${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX}help 𝙩𝙪̛̀𝙣𝙜 𝙡𝙚̣̂𝙣𝙝 𝙤̛̉ 𝙩𝙧𝙚̂𝙣 đ𝙚̂̉ 𝙭𝙚𝙢 𝙘𝙝𝙞 𝙩𝙞𝙚̂́𝙩 𝙘𝙖́𝙘𝙝 𝙨𝙪̛̉ 𝙙𝙪̣𝙣𝙜! | 𝙃𝙞𝙚̣̂𝙣 𝙩𝙖̣𝙞 đ𝙖𝙣𝙜 𝙘𝙤́ ${client.commands.size} 𝙡𝙚̣̂𝙣𝙝 𝙘𝙤́ 𝙩𝙝𝙚̂̉ 𝙨𝙪̛̉ 𝙙𝙪̣𝙣𝙜 𝙩𝙧𝙚̂𝙣 𝙗𝙤𝙩 𝙣𝙖̀𝙮. 𝙈𝙤̣𝙞 𝙩𝙝𝙖̆́𝙘 𝙢𝙖̆́𝙘 𝙭𝙞𝙣 𝙡𝙞𝙚̂𝙣 𝙝𝙚̣̂ 𝘼𝙙𝙢𝙞𝙣 𝘽𝙤𝙩. \n𝘾𝙝𝙪́𝙘 𝙘𝙖́𝙘 𝙗𝙖̣𝙣 𝙨𝙪̛̉ 𝙙𝙪̣𝙣𝙜 𝘽𝙤𝙩 𝙫𝙪𝙞 𝙫𝙚̉ ♥ ]`, event.threadID);

	}

	const infoHelp = command.config.info;
	var infoText = "";
	if (!infoHelp || infoHelp.length == 0) infoText = 'Không có';
	else {
		for (var i = 0; i < infoHelp.length; i++) {
			infoText +=
				`\n key: ${infoHelp[i].key}` + 
				`\n • Thông tin: ${infoHelp[i].prompt}` + 
				`\n • Định dạng: ${infoHelp[i].type}` + 
				`\n • Ví dụ: ${infoHelp[i].example}\n`
		}
	}
	return api.sendMessage(
		`=== ${command.config.name.toUpperCase()} ===\n${command.config.description}\n\n❯ Group: ${command.config.commandCategory}\n❯ Usage: ${command.config.usages}\n❯ Trong đó: ${infoText}\n❯ Cooldown: ${command.config.cooldowns}s\n❯ Prefix: ${(threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX}`, event.threadID)
}
