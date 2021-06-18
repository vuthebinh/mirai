module.exports.config = {
	name: "say",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "CatalizCS & KhanhsMilo Fix",
	description: "Khiến bot trả về file âm thanh của chị google thông qua văn bản",
	commandCategory: "media",
	usages: "say [Lang] [Text]",
	cooldowns: 5,
	info: [
		{
			key: "Lang",
			prompt: "Ngôn ngữ bạn muốn bot trả kết quả về, mặc định để trống là Tiếng Việt, có 4 ngôn ngữ 'ru, en, ja, vi'",
			type: 'Text',
			example: 'vi'
		},
		{
			key: "Text",
			prompt: "Văn bản bạn cần bot trả kết quả về thanh giọng nói, lưu ý độ dài dưới 100 từ!",
			type: 'Text',
			example: 'Mirai-Chan xin chào cả nhà'
		}
	]
};

module.exports.run =  async function ({ api, event, args }) {
	const axios = require("axios");
	const fs = require("fs-extra");
	var content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
	var languageToSay = (["ru","en","ko","ja"].some(item => content.indexOf(item) == 0)) ? content.slice(0, content.indexOf(" ")) : 'vi';
	var msg = (languageToSay != 'vi') ? content.slice(3, content.length) : content;
	
	var data = (await axios.get(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, { responseType: 'arraybuffer' })).data;
                fs.writeFileSync(__dirname + `/cache/${event.threadID}-${event.senderID}.mp3`, Buffer.from(data, 'utf-8'));
                return api.sendMessage({ body: "", attachment: fs.createReadStream(__dirname + `/cache/${event.threadID}-${event.senderID}.mp3`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.threadID}-${event.senderID}.mp3`));
			}