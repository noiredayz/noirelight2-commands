const {printtolog, getRndInteger, locateCharInStr} = require(process.cwd()+"/lib/nlt-tools.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const sfbBaseURL = "https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&limit=50&tags=";

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
if(nlt.channels[target_channel].links===0){
	resolve("this command cannot be used in channels where links are disabled.");
	return;
}
if(incmd.length===1){
	resolve("please specify at least one tag to search for");
	return;
}

const cltl = cmdline.toLowerCase();
if(cltl.includes("rating:safe") || cltl.includes("rating:explicit") || cltl.includes("-rating:safe")){
	resolve("why are you trying to find NSFW images on SAFEbooru again? Pepega Clap");
	return;
}
if(incmd.length>6){
	resolve("5 tags maximum weirdEg");
	return;
}
let gburl = sfbBaseURL+encodeURI(cmdline.substr(locateCharInStr(cmdline, " ", 1)));
const https_options = {
	url: gburl,
	method: "GET",
	headers: {
		"User-Agent": nlt.c.userAgent
	},
	timeout: 10000,
	retry: 0
};
nlt.got(https_options).json().then((d) => {
	if(d.length===0){
		resolve("couldn't find any images for your query.");
		return;
	}
	let iidx = getRndInteger(0, d.length-1);
	//resolve(`https://safebooru.org/index.php?page=post&s=view&id=`+d[iidx].id+` https://safebooru.org//images/`+d[iidx].directory+`/`+d[iidx].image);
	resolve(`https://safebooru.org/index.php?page=post&s=view&id=`+d[iidx].id);
	return;
	
}).catch((err) => {
	printtolog(LOG_WARN, `<safebooru> error while trying to search for ${encodeURI(cmdline.substr(locateCharInStr(cmdline, " ", 1)))}: ${err}`);
	reject(`http error while trying to perform your query`);
	return;
});

})
}

