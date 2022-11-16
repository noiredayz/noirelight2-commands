const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog, dcmdr} = require(process.cwd()+"/lib/nlt-tools.js");
const { nsfwCheckURL } = require(process.cwd()+"/lib/nlt-got.js");


exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise (async (resolve, reject) => {

let cmdline, incmd;

switch(target_context){
	case "twitch":
		cmdline = fullmsg.messageText.substr(1);	//full message excluding the prefix
		incmd 	= nlt.util.cleanupArray(cmdline.split(" "));				//same but split
		break;
	//placeholder for other contexts that may require extra handling Okayeg
	default:
		return;
		//cmdline = fullmsg.substr(1);
		//incmd	= cmdline.split(" ");
		break;
}

if(incmd.length<2){
	resolve(dcmdr("failed", false, "cmdfail", "specify an URL to an image to check"));
	return;
}

const https_options = {
	url: incmd[1],
	method: "HEAD",
	timeout: 3000,
	retry: 1
};
let nam;
try{
	nam = await nlt.got(https_options);
}
catch(err){
	printtolog(LOG_WARN, `<nsfwcheck> Unable to stat ${incmd[1]}: ${err}`);
	resolve(dcmdr("failed", false, "cmdfail", `unable to stat image: ${err}`));
	return;
}

try{
	nam = await nsfwCheckURL(incmd[1]);
}
catch(err){
	printtolog(LOG_WARN, `<nsfwcheck> Unable to perform check on ${incmd[1]}: ${err}`);
	resolve(dcmdr("failed", false, "cmdfail", `unable to check image: ${err}`));
	return;
}

resolve(dcmdr("success", true, "normal", `image: ${incmd[1]} ${nam}`));
return;

})
}

