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
		cmdline = fullmsg.substr(1);
		incmd	= cmdline.split(" ");
		break;
}


switch(incmd[0]){
	case "echo":
	case "say":
		nlt.ss[target_context].postmsg(target_channel, incmd.slice(1, incmd.length).join(" "), ["highprio"]);
		resolve("self-printing");
		break;
	case "eecho":
	case "esay":
	case "extsay":
	case "extecho":
		if(incmd.length<3){
			resolve(`usage: ${nlt.c.cmd_prefix+incmd[0]} <platform>-<channelname> <text to say>`);
			return;
		}
		let tch = incmd[1].split("-");
		if(tch.length!=2){
			resolve("second parameter must be in platform-channel format like twitch-ninja");
			return;
		}
		let chtarget = nlt.chctl.findChannel(tch[1], tch[0]);
		if (chtarget === -1){
			resolve(`"${tch[1]}" on platform "${tch[0]}" is not known. Target channel must be initialized (and in addition it must be in singleuser or normal mode).`);
			return;
		}
		if(nlt.channels[chtarget].chmode != 'S' && nlt.channels[chtarget].chmode != '2'){
			resolve(`target channel is disabled, to use eecho set its mode to singleuser or normal`);
			return;
		}
		nlt.ss[tch[0]].postmsg(chtarget, incmd.slice(2, incmd.length).join(" "), ["highprio"]);
		resolve("self-printing");
		break;
	default:
		reject(`received unknown alias ${incmd[0]}`);
		break;
}
return;
});
}

