const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog, dcmdr, validateTwitchUsername} = require(process.cwd()+"/lib/nlt-tools.js");
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
if(incmd.length<2){
		resolve(dcmdr("failed", false, "cmdfail", `Usage: ${nlt.c.cmd_prefix+incmd[0]} username`));
		return;
	}
if(!validateTwitchUsername(incmd[1])){
		resolve(dcmdr("failed", false, "cmdfail", `parameter is not a valid Twitch username.`));
		return;
}

let retval="", data;

//TODO: refactor to proper async await
try{
	data = await helixGetData("users", "login="+incmd[1]);
}
catch(err){
	printtolog(LOG_WARN, `<whois> Helix error: ${err}`);
	resolve(dcmdr("failed", false, "cmdfail", `error quering Twitch API`));
	return;
}
if(!data){	//Helix gave us back an empty set, could mean 2 things: 1. user is banned/deactivated 2. account doesn't exist fo sho
	try{
		retval = await nlt.got.get(`https://api.ivr.fi/v2/twitch/user?login=`+incmd[1]).json();
	}
	catch(err){
		printtolog(LOG_WARN, `<whois> Error querying IVR: ${err}`);
		resolve(dcmdr("success", false, "normal", `Couldn't find this user using Twitch's API and there was an error checking with IVR. If this user exists they are probably banned.`));
		return;
	}
	if(retval.length===0){
		resolve(dcmdr("success", false, "normal", `User was not found eShrug`));
		return;
	} else {
		let rs=`ID: ❌${retval[0].id} (${statusStr(retval[0].banReason)})`;
		resolve(dcmdr("success", false, "normal", rs));
		return;
	}
	return;
}
const d = data[0];
retval = `@${d.login}`;
if(d.login != d.display_name.toLowerCase()) retval+=` (${d.display_name})`;
if(d.broadcaster_type) retval += `, role: ${d.broadcaster_type}`;
if(d.type) retval += `(${d.type}) `;
retval+= `, ID: ${d.id}, account created at: ${d.created_at.substr(0, 10)}, channel description: ${d.description?d.description:"(empty)"}`;
resolve(dcmdr("success", false, "normal", retval));
return;

})
}

const statusTable = { TOS_INDEFINITE: "indefinitely banned",
					  TOS_TEMPORARY: "temporarily banned",
					  DEACTIVATED: "account deactivated by the user" };

function statusStr(instr){
	if(statusTable[instr]) return statusTable[instr];
	else return instr;
}

