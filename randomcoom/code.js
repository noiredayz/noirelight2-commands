const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog, donktime, getunixtime} = require(process.cwd()+"/lib/nlt-tools.js");
const {getRandomUserAgent, nsfwCheckURL} = require(process.cwd()+"/lib/nlt-got.js");


exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise (async (resolve, reject) => {

let cmdline, incmd;

switch(target_context){
	case "twitch":
		cmdline = fullmsg.messageText.substr(1);	//full message excluding the prefix
		incmd 	= cmdline.split(" ");				//same but split
		break;
	//placeholder for other contexts that may require extra handling Okayeg
	default:
		return;
		//cmdline = fullmsg.substr(1);
		//incmd	= cmdline.split(" ");
		break;
}
let chlist;
const https_options = {
	url: "https://api.booba.tv/",
	method: "GET",
	headers: {
		"User-Agent": getRandomUserAgent()
	},
	timeout: 3000,
	retry: 2
	};
try{
	chlist = await nlt.got(https_options).json();
}
catch(err){
	printtolog(LOG_WARN, `<randomcoom> Error while trying to fetch the coom list: ${err}`);
	reject("HTTP error while trying to fetch the channel list");
	return;
}

if(chlist.length===0){
	resolve("no booba streamers online FeelsBadMan");
	return;
}
const ctarget = chlist[getRndInteger(0, chlist.length-1)];
const tURL = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${ctarget.user_login}-1280x720.jpg`;
let retval;
try{
	retval = await nsfwCheckURL(tURL);
}
catch(err){
	printtolog(LOG_WARN, `<randomcoom> error while doing the nsfw check for ${ctarget.user_login}: ${err}`);
	reject("nsfw check failed monkaS");
	return;
}
resolve(`forsenCoomer channel: @${ctarget.user_login} thumbnail: ${tURL} ${retval}`);
return;


})
}

