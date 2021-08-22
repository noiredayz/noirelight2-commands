const {printtolog, donktime, getunixtime} = require(process.cwd()+"/lib/nlt-tools.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");

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
const theurl = "https://forsenjk-default-rtdb.firebaseio.com/forsen/last.json";

let retval;
try{
	retval = await nlt.got.get(theurl).json();
}
catch(err){
	reject(`http error while trying to fetch the data`);
	printtolog(LOG_WARN, `<bogsen> nlt.got error while trying to fetch the data: ${err}`);
	return;
}
if(!retval.percent){
	reject("missing required field 'percent' in the http reply");
	return;
}

const timestamp = donktime(getunixtime()-Math.floor(retval.mstime/1000));
resolve(`Hobo was at ${retval.percent}% ${timestamp} ago MEGALUL TeaTime`);

})
}

