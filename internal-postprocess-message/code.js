"use strict";
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog} = require(process.cwd()+"/lib/nlt-tools.js");


exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise ((resolve, reject) => {

let cmdline, incmd;

switch(target_context){
	case "twitch":
		cmdline = fullmsg.messageText;				//full message, without trimming because its the postprocessor
		incmd 	= cmdline.split(" ");				//same but split
		break;
	//placeholder for other contexts that may require extra handling Okayeg
	default:
		cmdline = fullmsg;
		cmdline = cmline.trim();
		incmd	= cmdline.split(" ");
		break;
}

if (target_channel === nlt.chctl.findChannel("noires_bot", "twitch") && cmdline.match(RegExp('NoireWut'))){
	nlt.ss["twitch"].postmsg(target_channel, `SmugNoire`);
	resolve("handled");
	return;
}

if (target_channel === nlt.chctl.findChannel("fabzeef", "twitch") && unick === "trichompbot" && cmdline === "asd"){
	nlt.ss["twitch"].postmsg(target_channel, `BeefJam`);
	resolve("handled");
	return;
}
printtolog(LOG_DBG, `<debug> IPPM: ${unick}`);
if(unick==="huwobot"){
	printtolog(LOG_DBG, `<debug> IPPM: huwobot: testing raid announcement`);
	if(cmdline.match(RegExp('A Raid Event at Level \\[[0-9]+\\] has appeared*'))){
		raid_broadcast();
		printtolog(LOG_DBG, `<debug> IPPM: huwobot raid detected`);
		if(!nlt.cache.getd("raid_self_join")){
			nlt.cache.setd("raid_self_join", "NaM", 60*20);
			nlt.ss["twitch"].postmsg(target_channel, "+join SirShield FeelsDankMan SirSword");
			printtolog(LOG_DBG, `<debug> IPPM: joining raid in #${nlt.channels[target_channel].name}`);
		} else {
			printtolog(LOG_DBG, `<debug> IPPM: not joining in #${nlt.channels[target_channel].name}, already joined the raid somewhere else`);
		}
		resolve("handled");
		return;
	} else {
		printtolog(LOG_DBG, `<ippm> huwobot: this is not a raid announcement`);
	}
	
	printtolog(LOG_DBG, `<debug> IPPM: huwobot: testing failed raid`);
	if(cmdline.includes("failed to beat the raid level")){
		printtolog(LOG_DBG, `<debug> IPPM: huwobot raid failed`);
		nlt.ss["twitch"].postmsg(target_channel, `UnSane`);
		resolve("handled");
		return;
	}
	printtolog(LOG_DBG, `<debug> IPPM: huwobot: testing successful raid`);
	if(cmdline.includes("users beat the raid level")){
		printtolog(LOG_DBG, `<debug> IPPM: huwobot raid success`);
		nlt.ss["twitch"].postmsg(target_channel, `KomodoHype`);
		resolve("handled");
		return;
	}
	printtolog(LOG_DBG, `<debug> IPPM: huwobot: test failed, this was a generic message: ${cmdline}`);
}

resolve("not handled");
return;

})
}

async function raid_broadcast(){
	if(nlt.cache.getd("raid_broadcast_run"))
		return
	else
		nlt.cache.setd("raid_broadcast_run", "", 60*60);
	//TODO: tell people to join raid based on subscription here	
	return;
}

