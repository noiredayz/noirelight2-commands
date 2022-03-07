const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog, dcmdr, validateTwitchUsername, donktime} = require(process.cwd()+"/lib/nlt-tools.js");
const {helixGetData} = require(process.cwd()+"/lib/nlt-got.js");


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
if(incmd.length<2 && target_context != "twitch"){
		resolve(dcmdr("failed", false, "cmdfail", `Usage: ${nlt.c.cmd_prefix+incmd[0]} username`));
		return;
}

let target;
if(incmd.length<2){
	target = nlt.channels[target_channel].name;
} else {
	 if (!validateTwitchUsername(incmd[1])){
		resolve(dcmdr("failed", false, "cmdfail", `parameter is not a valid twitch username`));
		return;
	} else {
		target = incmd[1];
	}
}

let retval="", udata, voddata;

try{
	udata = await helixGetData("users", "login="+target);
}
catch(err){
	printtolog(LOG_WARN, `<helix> Error in whois command: ${err}`);
	resolve(dcmdr("errored", false, "cmdfail", `API or HTTP error while trying to query Twitch`));
	return;
}
if(!udata){
	resolve(dcmdr("success", false, "normal", `User was not found or is currently banned.`));
	return;
}
const tID = udata[0].id;

try{
	voddata = await helixGetData("videos", "user_id="+tID+"&type=archive");
}
catch(err){
	printtolog(LOG_WARN, `<helix> Error in whois command: ${err}`);
	resolve(dcmdr("errored", false, "cmdfail", `API or HTTP error while trying to query Twitch`));
	return;
}
if(!voddata){
	resolve(dcmdr("success", false, "normal", `channel ${udata[0].login} has no previous broadcasts saved eShrug`));
	return;
}
const u = voddata[0];
retval += `Latest VOD from @${u.user_login} `;
if(u.user_login.toLowerCase() != u.user_name.toLowerCase()) retval += ` (${u.user_name}) `;
retval += `: ${u.title} ${u.url} length: ${u.duration}`;
const pubtime = donktime(Math.round((new Date/1000) - (new Date(u.published_at)/1000)));
retval += `, published ${pubtime} ago.`;
resolve(dcmdr("success", true, "normal", retval));

})
}

