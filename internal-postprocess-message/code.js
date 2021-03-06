"use strict";
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog} = require(process.cwd()+"/lib/nlt-tools.js");


exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise (async (resolve, reject) => {

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

if(unick==="huwobot"){
	if(cmdline.match(RegExp('A Raid Event at Level \\[[0-9]+\\] has appeared*'))){
		raid_broadcast(target_channel).then((d) => {
			printtolog(LOG_DBG, `<raid> broadcast result: ${d}`);
			});
		printtolog(LOG_DBG, `<debug> IPPM: huwobot raid detected`);
		if(!nlt.cache.getd("raid-self-join")){
			nlt.cache.setd("raid-self-join", "NaM", 60*20);
			nlt.ss["twitch"].postmsg(target_channel, "+join SirShield FeelsDankMan SirSword");
			printtolog(LOG_DBG, `<debug> IPPM: joining raid in #${nlt.channels[target_channel].name}`);
		} else {
			printtolog(LOG_DBG, `<debug> IPPM: not joining in #${nlt.channels[target_channel].name}, already joined the raid somewhere else`);
		}
		resolve("handled");
		return;
	}
	
	if(cmdline.includes("failed to beat the raid level")){
		nlt.ss["twitch"].postmsg(target_channel, `UnSane`);
		resolve("handled");
		return;
	}
	if(cmdline.includes("users beat the raid level")){
		nlt.ss["twitch"].postmsg(target_channel, `KomodoHype`);
		resolve("handled");
		return;
	}
}

if(unick==="noiredayz"){
	let asd="(no reply)";
	if(cmdline.match(RegExp("raid broadcast test"))){
		console.log("broadcast test start");
		try{
			asd = await raid_broadcast(target_channel);
		}
		catch(err){
			nlt.ss["twitch"].postmsg(target_channel, `broadcast test resulted in an error: ${err}`);
			resolve("handled");
		}
		nlt.ss["twitch"].postmsg(target_channel, `broadcast test result: ${asd}`);
	}
}

resolve("not handled");
return;

})
}

function raid_broadcast(target_channel){
	return new Promise(async (resolve, reject) => {
	let cdata = nlt.cache.getd(`raid broadcast ${nlt.channels[target_channel].name}`);
	console.log(`cdata: ${cdata}`);
	if(cdata === undefined){
		nlt.cache.setd(`raid broadcast ${nlt.channels[target_channel].name}`, "NaM", 60*60);
		printtolog(LOG_DBG, `<raidb> Broadcasting raid ping in channel ${nlt.channels[target_channel].name}`);
	} else {
		printtolog(LOG_DBG, `<raidb> Already broadcasted in this channel.`);
		resolve("already-broadcasted-here");
		return;
	}
	let nlist = nlt.maindb.selectQuery(`SELECT * FROM raidreg WHERE channelname='${nlt.channels[target_channel].name}' ORDER BY id ASC;`);
	printtolog(LOG_DBG, `<raidb> Selected ${nlist.length} entries from the list`);
	if(nlist.length===0 || nlist===-1 || !nlist) {
		resolve("empty-list");
		return;
	}
	let g=0, retval="FeelsDankMan ???? JOIN RAID ???? ", bc, inick;
	for(const l of nlist){
		inick = l.nick;
		if(nlt.util.internal_banphrase(inick)) continue;
		if(nlt.channels[target_channel].bpapi==="none"){
			retval += inick+" ";
		} else {
			try {
				bc = await nlt.ss["twitch"].pbotBanphraseCheck(nlt.channels[target_channel].bpapi, inick);
			}
			catch(err){
				printtolog(LOG_WARN, `<raid broadcast> failure banphrase checking nick ${inick} in ${nlt.channels[target_channel].name}: ${err}`);
				continue;
			}
			if(bc.banned) continue;
			else retval += inick+" ";
		}
		g++;
		if(g===10){
			nlt.ss["twitch"].postmsg(target_channel, retval);
			retval="FeelsDankMan ???? JOIN RAID ???? ";
			g=0;
		}
	}
	if(g!=0) nlt.ss["twitch"].postmsg(target_channel, retval);
	resolve("finished");
	return;
});
}

