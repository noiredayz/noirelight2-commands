const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog, dcmdr} = require(process.cwd()+"/lib/nlt-tools.js");
const {helixGetData} = require(process.cwd()+"/lib/nlt-got.js");


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
if(incmd.length<2){
		resolve(dcmdr("failed", false, "cmdfail", `Usage: ${nlt.c.cmd_prefix+incmd[0]} username`));
		return;
	}
if(incmd[1].length<3 || incmd[1].length>25){
		resolve(dcmdr("failed", false, "cmdfail", `parameter is too long or too short. Valid twitch usernames are between 3 and 25 characters.`));
		return;
}

let retval="";

helixGetData("users", "login="+incmd[1]).then((data) => {
	if(!data){
		resolve(dcmdr("success", false, "normal", `User was not found or is currently banned.`));
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
}).catch((err) =>{
	printtolog(LOG_WARN, `<helix> Error in whois command: ${err}`);
	resolve(dcmdr("errored", false, "cmdfail", `API or HTTP error while trying to query Twitch`));
	return;
});

})
}

