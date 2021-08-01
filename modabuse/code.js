const {printtolog, locateCharInStr, donktime} = require(process.cwd()+"/lib/nlt-tools.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");

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
		reject("This command cannot be used outside of Twitch.");
		return;
		//cmdline = fullmsg.substr(1);
		//incmd	= cmdline.split(" ");
		break;
}

const cPerms = nlt.cache.getd("twitch-userstate-"+nlt.channels[target_channel].name);
if(!cPerms){
	reject("no userstate cached for this channel.")
	return;
}
if(!cPerms.isMod || nlt.channels[target_channel].name != nlt.c.twitch.username){
	reject("I have no moderation permissions for this operation");
	return;
}
if(incmd.length===1){
	resolve(`Not enough parameters. Check help or command list for usage.`);
	return;
}
let banmsg="", length=1;
switch(incmd[1]){
	case "ban":
		if(incmd.length<3){
			resolve(`Usage: ${nlt.c.cmd_prefix}modabuse ban <username> <optional reason>`);
			return;
		}
		if(incmd[2].length<3 || incmd[2].length>25){
			resolve(`invalid username, must be between 3 and 25 characters per Twitch's username limits. Name must be a base nick, not a display name.`);
			return;
		}
		if(incmd.length>=4){
			banmsg = cmdline.substr(locateCharInStr(cmdline, " ", 3)+1);
		}
		nlt.ss["twitch"].ban(nlt.channels[target_channel].name, incmd[2], banmsg).then(()=> {
			resolve(`successfully banned ${incmd[2]} MODS Clap`);
			return;
		}).catch((e) => {
			printtolog(LOG_WARN, `<modabuse> Error while trying to ban${incmd[2]} in channel ${nlt.channels[target_channel].name}: ${e}`);
			resolve("error while trying to ban that user, check console for details.");
			return;
		});
		break;
	case "timeout":
		if(incmd.length<4){
			resolve(`Usage: ${nlt.c.cmd_prefix}modabuse timeout <username> <duration> <optional reason>`);
			return;
		}
		if(incmd[2].length<3 || incmd[2].length>25){
			resolve(`invalid username, must be between 3 and 25 characters per Twitch's username limits. Name must be a base nick, not a display name.`);
			return;
		}
		if(Number.isNaN(incmd[3])){
			resolve(`duration must be a number.`);
			return;
		}
		length=Number(incmd[3]);
		if(length<1 || length>1209600){
			resolve(`timeout length must be at least 1 second and at most 1.209.600 second (2 week)`);
			return;
		}			
		if(incmd.length>=5){
			banmsg = cmdline.substr(locateCharInStr(cmdline, " ", 4)+1);
		}
		nlt.ss["twitch"].timeout(nlt.channels[target_channel].name, incmd[2], length, banmsg).then(()=>{
			resolve(`successfully timed out ${incmd[2]} for ${length} seconds MODS Clap`);
			return;
		}).catch((e) => {
			printtolog(LOG_WARN, `<modabuse> Error while trying to time out ${incmd[2]} in channel ${nlt.channels[target_channel].name} for ${length}s (${donktime(length)}): ${e}`);
			resolve("error while trying to timeout that user, check console for details.");
			return;
		});
		break;
	case "unban":
	case "untimeout":
		resolve("forsenChin no unbans");
		return;
		break;
	default:
		resolve(`invalid method ${incmd[1]} valid methods are timeout and ban`);
		return;
		break;
	}


})
}
