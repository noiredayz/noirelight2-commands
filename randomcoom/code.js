const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog, donktime, getunixtime, getRndInteger, dcmdr, cleanupArray} = require(process.cwd()+"/lib/nlt-tools.js");
const {getRandomUserAgent, nsfwCheckURL, thumbnailExists, helixGetData} = require(process.cwd()+"/lib/nlt-got.js");


exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise (async (resolve, reject) => {

let cmdline, incmd;

switch(target_context){
	case "twitch":
		cmdline = fullmsg.messageText.substr(1);	//full message excluding the prefix
		incmd 	= cleanupArray(cmdline.split(" "));				//same but split
		break;
	//placeholder for other contexts that may require extra handling Okayeg
	default:
		return;
		//cmdline = fullmsg.substr(1);
		//incmd	= cmdline.split(" ");
		break;
}
let target;
if(incmd.length>1){
	if(incmd[1].toLowerCase() === "list"){
		target = "list";
	} else {
		target = Number(incmd[1]);
		if (target === NaN || target<0 || !Number.isInteger(target)){
			resolve("parameter must be an integer >0 or 'list'");
			return;
		}
		
	}
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

if(target==="list"){
	resolve(`${chlist.length} booba streamers are currently online.`);
	return;
}

let tID, previd = nlt.cache.getd("randomcoom-last-num");
if(target === undefined){
	if(!previd || chlist.length===1)
		tID = getRndInteger(0, chlist.length-1);
	else
		do{
			tID = getRndInteger(0, chlist.length-1);
			if(tID != previd)
			continue;
		} while (tID === previd);
	nlt.cache.deld("randomcoom-last-num")
	nlt.cache.setd("randomcoom-last-num", tID, 120);
} else {
	if(target>chlist.length)
		tID = chlist.length-1;
	else
		tID = target-1;
}

let hxdata;
hxdata = await helixGetData("users", "id="+chlist[tID].user_id);
if(!hxdata){
	resolve(dcmdr("failed", false, "failed", "inconsistent data monkaS (API returned a user ID that cannot be queried, is the streamer banned?)"));
	return;
}
const ctarget = hxdata[0].login;
const tURL = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${ctarget}-1920x1080.jpg`;
let retval;
try{
	retval = await thumbnailExists(tURL);
}
catch(err){
	printtolog(LOG_WARN, `<streamthumb> http error while trying to check if thumbnail exists: ${err}`);
	resolve(`rolled channel @${ctarget} but couldn't check if its thumbnail is available, so not doing the nsfw check. You can still get the thumb using ${nlt.c.cmd_prefix}st ${ctarget.user_login}`);
	return;
}
if(!retval){
	resolve(`rolled channel @${ctarget} is offline or doesn't have a thumbnail yet.`);
	return;
}
try{
	retval = await nsfwCheckURL(tURL);
}
catch(err){
	printtolog(LOG_WARN, `<randomcoom> error while doing the nsfw check for ${ctarget.user_login}: ${err}`);
	reject("nsfw check failed monkaS");
	return;
}
resolve(`forsenCoomer channel: @${ctarget} (${tID+1}/${chlist.length}) thumbnail: ${tURL} ${retval}`);
return;


})
}

