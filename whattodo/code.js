const {printtolog} = require(process.cwd()+"/lib/nlt-tools.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");

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
const https_options = {
	url: "https://www.boredapi.com/api/activity",
	method: "GET",
	headers: {
		"User-Agent": nlt.c.userAgent
	},
	timeout: 3000,
	retry: 0
};

nlt.got(https_options).json().then((d) => {
	if(!d.activity){
		printtolog(LOG_WARN, `<randomactivity> API sent back malformed/incomplete reply: ${JSON.stringify(d)}`);
		reject(`no "activity" field in server reply`);
		return;
	}
	resolve(d.activity);
	return;
}).catch((err) => {
	printtolog(LOG_WARN, `<randomactivity> HTTP error: ${err}`);
	reject("HTTP error while trying to GET from boredapi");
	return;
});

})
}

