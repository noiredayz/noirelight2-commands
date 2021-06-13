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

if(incmd.length<2){
	resolve(`Usage: ${nlt.c.cmd_prefix}help <command name> See ${nlt.c.cmd_prefix}commands for list of commands`);
	return;
}
const htopic = incmd[1].toLowerCase();
let cid = nlt.cmd.cmds.findIndex(c => c.cmdname === htopic);

//Easiest case: command name match
if(cid != -1) {
	resolve(nlt.cmd.cmds[cid].help.shorthelp);
	return;
}

let halias = nlt.cmd.getAlias(htopic);
cid = nlt.cmd.cmds.findIndex(c => c.cmdname === halias);
if (cid === -1){
	resolve(`unknown command/help topic ${htopic}`);
	return;
}
if(!nlt.cmd.cmds[cid].help){
	resolve(`command ${htopic} has no help available, please WeirdChamp @ the developer`);
	return;
}
let ahid;
if(nlt.cmd.cmds[cid].help.aliashelp){
	ahid = nlt.cmd.cmds[cid].help.aliashelp.findIndex(e => e[0] === htopic);
	if (ahid === -1)
		resolve(nlt.cmd.cmds[cid].help.shorthelp);
	else
		resolve(nlt.cmd.cmds[cid].help.aliashelp[ahid][1]);
	return;	
} else {
	resolve(nlt.cmd.cmds[cid].help.shorthelp);
	return;
}


});
}

