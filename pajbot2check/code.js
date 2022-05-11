const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog, dcmdr} = require(process.cwd()+"/lib/nlt-tools.js");

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

if(nlt.channels[chid].pb2==="none"){
	resolve(`Specified channel ${bch} does not have a configured pajbot2.`);
	return;
}

nlt.ss["twitch"].pajbot2check(chid, cmdline.substr(nlt.util.locateCharInStr(cmdline, " ", 2)+1)).then((retval) =>{
	if(retval.banned){
		resolve(`MODS 👉 ${retval.filter_data[0].reason}`);
		return;
	}
	else {
		resolve(`That message does not triggered a pb2 banphrase.`);
		return;
	}

}).catch((err)=>{
	printtolog(LOG_WARN, `<pb2check cmd> error while checking: ${err}`);
	reject(`unable to check banphrase api due to an error.`);
	return;
});

})	//end of Promise

}	//end of command

