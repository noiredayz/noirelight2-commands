"use strict";
const {printtolog} = require("./lib/nlt-tools.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require("./lib/nlt-const.js");

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
		reject("this command can only be used in Twitch channels.");
		return;
		//cmdline = fullmsg.substr(1);
		//incmd	= cmdline.split(" ");
		break;
}
let chlist;
let retval;
try{
	chlist = await nlt.got.get("https://huwobot.com/api/channels").json();
}
catch(err){
	printtolog(LOG_WARN, `<raidreg> HTTP error while trying to query huwobot: ${err}`);
	reject("error while trying to query huwobot monkaS");
	return;
}

const chname = nlt.channels[target_channel].name;
if(chlist.findIndex(r => r === chname)===-1){
	resolve("This command can only be used in channels where HuwoBot is active.");
	return;
}
switch(incmd[0]){
	case "raidreg":
		rrows = nlt.maindb.selectQuery(`SELECT * FROM raidreg WHERE channel='${chname}' AND username='${unick}';`);
		if(rrows.length>0){
			resolve(`you are already subscribed to a raid alert in this channel. You may remove your subscription with ${nlt.c.cmd_prefix}raidunreg`);
			return;
		}
		rrows = nlt.maindb.selectQuery(`SELECT * FROM raidreg WHERE username='${unick}';`);
		if(rrows.length>3){
			resolve(`you are already subscribed for a raid alert in the maximum of 3 channels.`);
			return;
		}
		if(nlt.channels[target_channel].bpapi!="none"){
			try{
				retval = await nlt.ss["twitch"].pbotBanphraseCheck(nlt.channels[target_channels].bpapi, unick);
			}
			catch(err){
				retval = {banned: false, failed: true};
			}
			if(retval.banned){
				nlt.ss["twitch"].postmsg(target_channel, "Nice try kid, next time try to subscribe using a non-banphrased username.");
				resolve("self-printing");
				return;
			}
		}
		

})
}`

