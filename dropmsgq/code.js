exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise ((resolve, reject) => {

let cmdline, incmd;

switch(target_context){
	case "twitch":
		cmdline = fullmsg.messageText.substr(1);	//full message excluding the prefix
		incmd 	= cmdline.split(" ");				//same but split
		break;
	//placeholder for other contexts that may require extra handling Okayeg
	case "ebot":
		reject("this command cannot be used from EBOT API");
		return;
		break;
	default:
		return;
		//cmdline = fullmsg.substr(1);
		//incmd	= cmdline.split(" ");
		break;
}
let retval;
if(incmd.length===1){
	retval = nlt.msgqdb.insertQuery(`DELETE FROM mq WHERE context='${target_context}';`);
	if(retval.changes===0){
		resolve("This platform had no pending messages.");
		return;
	} else {
		resolve(`successfully dropped ${retval.changes} pending messages from the current platform.`);
		return;
	}
} else {
	const tpf = incmd[1].toLowerCase(); 
	if(!nlt.ss[tpf]){
		reject(`platform ${tpf} doesn't exist`);
		return;
	}
	retval = nlt.msgqdb.insertQuery(`DELETE FROM mq WHERE context='${tpf}';`);
	if(retval.changes===0){
		resolve(`Platform "${tpf}" had no pending messages.`);
		return;
	} else {
		resolve(`successfully dropped ${retval.changes} pending messages from the platform "${tpf}".`);
		return;
	}
}



})
}

