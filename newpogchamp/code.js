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

//Expected invocation is:
//newpog YYYY-MM-DD×https://static.twcdn.net/emote...×LiteralWho( @literalwho ) twitch partner ×twitter links
//NOTE: thats an unicode multiplication sign × not an x letter Okayeg !

if(incmd.length<2){
	resolve(`Usage: ${nlt.c.cmd_prefix+incmd[0]} YYYY-MM-DD×emote url×description×twitter links separated by space`);
	return;
}

const inparams = cmdline.substr(nlt.util.locateCharInStr(cmdline, " ")+1).split("×");
if(inparams.length<4){
	resolve(`Usage: ${nlt.c.cmd_prefix+incmd[0]} YYYY-MM-DD×emote url×description×twitter links separated by space`);
	return;
}

let rrows = nlt.maindb.selectQuery(`SELECT * FROM pogchamp WHERE date='${inparams[0]}';`);
if (rrows.length>0){
	resolve(`there is already a record for date ${inparams[0]}`);
	return;
}

rrows = nlt.maindb.insertQuery(`INSERT INTO pogchamp
									(date, emote, comment, source)
									VALUES
									('${inparams[0]}', '${inparams[1]}', '${inparams[2]}', '${inparams[3]}');`);
if(rrows.changes===1){
	resolve(`record addedd successfully. Test it with ${nlt.c.cmd_prefix}pogchamp ${inparams[0]}`);
	return;
} else {
	reject(`error while adding new record, check console monkaS`);
	return;
}
})
}

