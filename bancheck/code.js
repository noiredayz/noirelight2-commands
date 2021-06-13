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

let bch="";

if(incmd.length<3){
	resolve(`Usage: ${nlt.c.cmd_prefix}${incmd[0]} channel text-to-phrase NOTE: channel names are handled as twitch channel names!`);
	return;
}

//TODO: create a less donk method for aliasing channel names

switch(incmd[1].toLowerCase()){
        case "paja":
        case "pajaw":
                bch="pajlada";
                break;
        case "vadikus":
                bch="vadikus007";
                break;
        case "hobo":
        case "forsan":
                bch="forsen";
                break;
        default:
                bch=incmd[1].toLowerCase();
                break;
}

const chid = nlt.chctl.findChannel(bch, "twitch");
if(chid === -1){
	resolve(`invalid twitch channel "${bch}"`);
	return;
}


if (bch === target_channel){
	resolve(`don't you think it's kinda dumb banphrase checking the channel you are in? PepeLaugh`);
	return;
}

if(nlt.channels[chid].bpapi==="none"){
	resolve(`Specified channel ${bch} does not have a configured pajbot1. (note: this command cannot query the AutoMod, pajbot2 and other bots like NightBot)`);
	return;
}

nlt.ss["twitch"].pbotBanphraseCheck(nlt.channels[chid].bpapi, cmdline.substr(nlt.util.locateCharInStr(cmdline, " ", 2)+1)).then((retval) =>{
	if(retval.banned){
		resolve(`MODS 👉 id: ${retval.banphrase_data.id}, name: ${retval.banphrase_data.name}, phrase: "${retval.banphrase_data.phrase.substring(0, 30)}", length ${nlt.util.donktime(Number(retval.banphrase_data.length))}, perma: ${retval.banphrase_data.permanent}, operator: ${retval.banphrase_data.operator}, case sensitive: ${retval.banphrase_data.case_sensitive}, subs immune: ${retval.banphrase_data.sub_immunity}, removes accents: ${retval.banphrase_data.remove_accents}`);
		return;
	}
	else {
		resolve(`that message look fine (unless mods, pajbot2, other bots etc. think otherwise Keepo )`);
		return;
	}

}).catch((errVal)=>{
	reject(`unable to check banphrase api due to an error.`);
	return;
});

})	//end of Promise

}	//end of command

