const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog} = require(process.cwd()+"/lib/nlt-tools.js");


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
		return;
		//cmdline = fullmsg.substr(1);
		//incmd	= cmdline.split(" ");
		break;
}

if(incmd.length<2){
	resolve(`usage: ${nlt.c.cmd_prefix}deltl <url>`);
	return;
}
const retval = nlt.tldb.insertQuery(`DELETE FROM tl WHERE url LIKE '%`+incmd[1]+`%';`);
if(retval.changes>0){
	resolve(`Successfully deleted ${retval.changes} entries.`);
	return;
} else {
	resolve(`No rows were deleted eShrug`);
	return;
}

})
}

