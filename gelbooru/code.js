const {printtolog, getRndInteger, locateCharInStr} = require("./lib/nlt-tools.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require("./lib/nlt-const.js");
const gbBaseURL = "https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=50";

exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise ((resolve, reject) => {

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
if(!nlt.c.gelbooru_key){
	reject("gelbooru API key is not set in config");
	return;
}
if(incmd.length===1){
	resolve("please specify at least one tag to search for");
	return;
}

const cltl = cmdline.toLowerCase();
if(cltl.contains("rating:safe") || cltl.contains("rating:explicit") || cltl.contains("-rating:safe")){
	resolve("NOIDONTHINKSO you can only search for images tagged as worksafe");
	return;
}
if(cmdline.length>6){
	resolve("6 tags maximum weirdEg");
	return;
}
let gburl = gbBaseURL+nlt.c.gelbooru_key+"&tags="+encodeURI(cmdline.substr(locateCharInStr(cmdline, " ", 1)));
const https_options = {
	url: gburl,
	method: "GET",
	headers: {
		"User-Agent": nlt.c.userAgent
	},
	timeout: 3000,
	retry: 0
};
nlt.got(https_options).thend((d) => {
	
}).catch((err) => {
	
});

})
}

