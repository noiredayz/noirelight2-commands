const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog, cleanupArray, dcmdr, sleep} = require(process.cwd()+"/lib/nlt-tools.js");

const channelname = "deepdankdungeonbot";

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

if(target_context!="twitch" || nlt.channels[target_channel].name!=channelname){
	resolve(dcmdr("failed", false, "cmdfail", "This command can only be used on twitch in #"+channelname));
	return;
}

let c = nlt.maindb.selectQuery("SELECT * FROM auth WHERE keyname='dungeonbot-restart-command';");
if(c.length===0){
	resolve(dcmdr("failed", false, "cmdfail", "restart command is not set in db, cannot restart the other bot"));
	return;
}

nlt.ss["twitch"].postmsg(target_channel, "Running check to see if dungeonbot is alive");
nlt.ss["twitch"].postmsg(target_channel, "+nlt2ping");
await(sleep(5000));
if(nlt.cache.getd("dungeonbot_pingback")){
	resolve(dcmdr("success", false, "normal", "Dungeonbot seems to be alive Clueless if it's not replying normally, there might be temporary network issues (it's TMI pajaCope )"));
	return;
}
nlt.ss["twitch"].postmsg(target_channel, "+nlt2ping");
await(sleep(5000));
if(nlt.cache.getd("dungeonbot_pingback")){
	resolve(dcmdr("success", false, "normal", "Dungeonbot seems to be alive Clueless if it's not replying normally, there might be temporary network issues (it's TMI pajaCope )"));
	return;
}
nlt.ss["twitch"].postmsg(target_channel, "+nlt2ping");
await(sleep(5000));
if(nlt.cache.getd("dungeonbot_pingback")){
	resolve(dcmdr("success", false, "normal", "Dungeonbot seems to be alive Clueless if it's not replying inormally, there might be temporary network issues (it's TMI pajaCope )"));
	return;
}
nlt.ss["twitch"].postmsg(target_channel, "dungeonbot didn't reply, restarting it");
await nlt.exec.exec(c[0].data);
resolve(dcmdr("success", false, "normal", "Restart command was issued, the bot should come back soon. If not you may 1. run THIS command again in 2 minutes 2. ping @noiredayz :tf:"));
return;
})
}

