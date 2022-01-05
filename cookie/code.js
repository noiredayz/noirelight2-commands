const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog} = require(process.cwd()+"/lib/nlt-tools.js");
const exec = require("child_process");

const maxCookieLength = "100";	//number, but in string 

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
let retval="";
try{
	retval = exec.execFileSync("fortune", ["-s", "-n", maxCookieLength]).toString();
}
catch(err){
	printtolog(LOG_WARN, `<fortune> Unable to execute fortune command, is the fortune package installed on the host system?`);
	printtolog(LOG_WARN, `<fortune> Error was: ${err}`);
	reject("error while trying to get a cookie.");
}

retval = retval.replaceAll("\t", " ").replaceAll("\r", "").replaceAll("\n", " ");	//DANK
resolve(retval);


})
}

