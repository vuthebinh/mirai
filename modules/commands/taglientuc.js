module.exports.config = {
	name: "taglientuc",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "VanHung & Dựa trên demo của NTKhang",
	description: "Tag liên tục người bạn tag trong 5 lần\nCó thể gọi là gọi hồn người đó",
	commandCategory: "group",
	usages: "taglientuc @mention",
	cooldowns: 5,
	dependencies: ["fs-extra","axios"]
}

module.exports.run = async function({ api, args, Users, event}) {
	var mention = Object.keys(event.mentions)[0];
	if(!mention) return api.sendMessage("Cần phải tag 1 người bạn muốn gọi hồn", event.threadID);
	let data = await api.getUserInfo(mention);
	let name = data[parseInt(mention)].name;
	var arraytag = [];
		arraytag.push({id: mention, tag: name});
	var a = function (a) { api.sendMessage(a, event.threadID); }
a("Bắt đầu tag!");
setTimeout(() => {a({body: "Alo con lợn" + " " + name, mentions: arraytag})} , 3000);
setTimeout(() => {a({body: "Có người cần gặp nè" + " " + name, mentions: arraytag})} , 7000);
setTimeout(() => {a({body: "Hiện hồn đi con lợn này" + " " + name, mentions: arraytag})} , 11000);
setTimeout(() => {a({body: "Địt con mẹ mày đâu rồi ra đây mau" + " " + name, mentions: arraytag})} , 15000);
setTimeout(() => {a({body: "Vào mess đi có người kiếm kìa con đĩ" + " " + name, mentions: arraytag})} , 20000);
	}