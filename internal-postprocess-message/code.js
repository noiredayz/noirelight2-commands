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
const raid_regexp = RegExp('A Raid Event at Level \\[[0-9]+\\] has appeared*'); 	

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

if(target_channel === nlt.chctl.findChannel("fabzeef", "twitch") && unick==="buttsbot" && cmdline.toLowerCase().startsWith(nlt.c.cmd_prefix+"duardo")){
	nlt.ss["twitch"].postmsg(target_channel, `I meu\u{E0000}rsaulted LuL`);
	resolve("handled");
	return;
}

if(unick==="huwobot" && cmdline.match(raid_regex)){
	raid_broadcast();
	if(!nlt.cache.getd("raid_self_join")){
		if(nlt.channels[target_channel].chmode==="2"){
			nlt.cache.setd("raid_self_join", "", 60*60);
			nlt.ss["twitch"].postmsg(target_channel, "+join SirShield FeelsDankMan SirSword");
		}
	}
	resolve("handled");
}

if(unick==="huwobot" && cmdline.includes("failed to beat the raid level" && nlt.channels[target_channel].chmode==="2")){
		nlt.ss["twitch"].postmsg(target_channel, `UnSane`);
		resolve("handled");
		return;
	}

if(unick==="huwobot" && cmdline.includes("users beat the raid level") && nlt.channels[target_channel].chmode==="2"){
	nlt.ss["twitch"].postmsg(target_channel, `KomodoHype`);
	resolve("handled");
	return;
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
}
