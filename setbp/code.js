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
		reject(`don't change twitch channels' settings from other platforms weirdEg`);
		return;
		//cmdline = fullmsg.substr(1);
		//incmd	= cmdline.split(" ");
		break;
}
let tch, chid;
switch(incmd[0]){
	case "unsetbp":
		if(incmd.length<2){
			resolve(`Usage: ${nlt.c.cmd_prefix}unsetbp <channel name>`);
			return;
		}
		tch = incmd[1].toLowerCase();
		chid = nlt.chctl.findChannel(tch, "twitch");
		if(chid === -1){
			resolve(`unknown twitch channel ${tch}`);
			return;
		}
		if(nlt.channels[chid].bpapi==="none"){
			resolve(`banphrase check is already disabled in channel ${tch}`);
			return;
		}
		nlt.channels[chid].bpapi="none";
		nlt.maindb.insertQuery(`UPDATE channels SET bpapi_url='none' WHERE name='${tch}' AND context='twitch';`);
		resolve(`successfully disabled banphrase checking in twitch channel ${tch}`);
		return;
		break;
	case "setbp":
		if(incmd.length<3){
			resolve(`Usage: ${nlt.c.cmd_prefix}setbp <channel name> <pajbots websites base URL>`);
			return;
		}
		tch = incmd[1].toLowerCase();
		chid = nlt.chctl.findChannel(tch, "twitch");
		if(chid === -1){
			resolve(`unknown twitch channel ${tch}`);
			return;
		}
		if(incmd[2].includes("/")){
			resolve(`Only enter the domain of the URL, no protocol or path, for example pb.awesomebot.com`);
			return;
		}
		nlt.channels[chid].bpapi=incmd[2];
		nlt.maindb.insertQuery(`UPDATE channels SET bpapi_url='${incmd[2]}' WHERE name='${tch}' AND context='twitch';`);
		resolve(`successfully set the banphrase checking URL of twitch channel ${tch} to ${incmd[2]}`);
		return;
		break;
	default:
		reject("internal command error(invalid alias");
		break;
		return;
	}
})
}

