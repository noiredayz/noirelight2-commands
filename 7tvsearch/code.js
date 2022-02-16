const {printtolog, locateCharInStr} = require(process.cwd()+"/lib/nlt-tools.js");
const {parseCmdParam} = require(process.cwd()+"/lib/nlt-paramparser.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");

//AnatoleAM on Discord said the limits are
//150 for v2
//300 for v3
const searchLimit = 100;	//default is 100, still the double of bttv and ffz search KUKLE

exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise (async (resolve, reject) => {

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

reject({status: "errored", err: new Error("function not implemented.")});
return;

let tIDX = 1;

if(incmd.length===1){
	resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `Usage: ${nlt.c.cmd_prefix+incmd[0]} <emote name>`});
	return;
}
const scmd = parseCmdParam(cmdline.substr(locateCharInStr(cmdline, " ")+1));
if(!scmd){
	reject({status: "errored", err: new Error("unable to parse parameters")});
	return;
}
if(scmd.freestr.length===0){
	resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `You must specify an emote name to search for Weirdga`});
}
if(scmd.i){
	if(isNaN(scmd.i) && scmd.i!="random"){
		resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `Index must be a number from 1 to ${searchlimit} or "random"`});
		return;
	}
	if(scmd.i<1 || scmd.i>searchLimit || !Number.isInteger(scmd.i)){
		resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `Index must be a number from 1 to ${searchlimit} or "random"`});
		return;
	}
	tIDX = scmd.i;
}
if(scmd.author){
	if(scmd.author.length>25 || scmd.author.length<3){
		resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `Invalid author name (must be >=3 and <=25 characters long)`});
		return;
	}
}

//TODO: add v3 REST emote search here

});
}

