const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog, donktime, getunixtime, cleanupArray} = require(process.cwd()+"/lib/nlt-tools.js");

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
		cmdline = fullmsg.substr(1);
		incmd	= cmdline.split(" ");
		break;
}

if(incmd.length===1){
	resolve(`usage: ${incmd[0]} channelname`);
	return;
}
const chid = nlt.chctl.findChannel(incmd[1].toLowerCase(), "twitch");
if(chid===-1){
	resolve(`invalid twitch channel name ${incmd[1]}`);
	return;
}
let retval=`Twitch channel ${nlt.channels[chid].name}: mode: ${nlt.channels[chid].chmode}, `;
if(nlt.channels[chid].bpapi==="none")
	retval += "banphrase api: none, ";
else {
	let stime = new Date;
	let bpresult;
	try{
		bpresult = await nlt.ss["twitch"].pbotBanphraseCheck(nlt.channels[chid].bpapi, "test :)");
	}
	catch(err){
		retval += `banphrase api: ${nlt.channels[chid].bpapi} (error), `;
	}
	if(bpresult){
		stime = new Date - stime;
		retval += `banphrase api: ${nlt.channels[chid].bpapi} (${stime}ms), `;
	}
}	
let lastline = nlt.logdb.selectQuery(`SELECT * FROM selfposts WHERE channel='${nlt.channels[chid].name}' ORDER BY id DESC LIMIT 1;`);
if(lastline.length===0){
	retval += `no bot activity since 2021-08-23`;
} else {
	retval += `last bot activity ${donktime(getunixtime()-lastline[0].time)} ago`;
}
resolve(retval);
return;

})
}

