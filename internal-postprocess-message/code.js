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
		cmdline = fullmsg.substr(1);
		cmdline = cmline.trim();
		incmd	= cmdline.split(" ");
		break;
}
const raid_regexp = RegExp('A Raid Event at Level \\[[0-9]+\\] has appeared*'); 

/*
if (target_channel === nlt.chctl.findChannel("supinic", "twitch") && unick === "supibot" && String(cmdline).trim()==="ppCircle"){
	nlt.ss["twitch"].postmsg(target_channel, `ppSlide . o O ( ppCircle )`);
	resolve("handled");
	return;
}
*/
if(target_channel === nlt.chctl.findChannel("supinic", "twitch") ){
	if (unick === "wanductbot" && cmdline === "ppCircle"){
		nlt.ss["twitch"].postmsg(target_channel, `ppCircle . o O ( ppSlide )`);
		resolve("handled");
		return;
	}
	if (unick === "stonks_bot500" && cmdline === "AlienPls Bot started AlienPls"){
		nlt.ss["twitch"].postmsg(target_channel, `AlienPls`);
		resolve("handled");
		return;
	}
	if(unick==="huwobot" && cmdline.match(raid_regexp)){
		nlt.ss["twitch"].postmsg(target_channel, `+join TO ARMS! SirShield FeelsDankMan SirSword`);
		nlt.ss["twitch"].postmsg(target_channel, `elfidelfie alecbirdman griphthefrog FeelsDankMan 🔔 join raid`);
		resolve("handled");
		return;
	}
	if(unick==="huwobot" && cmdline.includes("failed to beat the raid level")){
		nlt.ss["twitch"].postmsg(target_channel, `peepoSadDank`);
		resolve("handled");
		return;
	}
	if(unick==="huwobot" && cmdline.includes("users beat the raid level")){
		nlt.ss["twitch"].postmsg(target_channel, `KomodoHype`);
		resolve("handled");
		return;
	}
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

if (target_channel === nlt.chctl.findChannel("senderak", "twitch") && unick === "senderakbot" && String(cmdline).trim()==="dankClappers"){
	nlt.ss["twitch"].postmsg(target_channel, `PETTHEDANK`);
	resolve("handled");
	return;
}
 

resolve("not handled");
return;

})
}

