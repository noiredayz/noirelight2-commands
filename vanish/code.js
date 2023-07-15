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
if(!cPerms.isMod && nlt.channels[target_channel].name != nlt.identities["twitch"].login){
	resolve("You cannot vanish here.");
	return;
}
if(unick.toLowerCase() === nlt.channels[target_channel].name){
	resolve("I cannot time out the broadcaster.");
	return;
}
if(fullmsg.isMod && nlt.channels[target_channel].name === nlt.identities["twitch"].login){
	resolve("Timing out moderators will result in losing their moderation status, so I won't do it.");
	return;
}	
if(fullmsg.isMod){
	resolve("I cannot time out other moderators.");
	return;
}
nlt.ss["twitch"].timeout(nlt.channels[target_channel].name, unick, 1, "Vanished").then(()=> {
	resolve("self-printing");
	return;
}).catch((e)=>{
	printtolog(LOG_WARN, `<vanish> Error timing out ${unick} in ${nlt.channels[target_channel].name}: ${e}`);
	reject("could not time you out because of an error.");
	return;
});



})
}
