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
if(!nlt.c.trilaud){
	reject("trilaud server's address is missing from the config");
	return;
}
if(nlt.c.trilaud.length===0){
	reject("trilaud server's address is empty in the config");
	return;
}
const https_options = {
	method: "GET",
	url: nlt.c.trilaud+"/stats/json",
	retry: 2,
	timeout: 3000 };
nlt.got(https_options).json().then((d) => {
	resolve(`TriHard 🤝 VisLaud currenly joined ${d.chActive} channels. Received ${d.gifts.self} gift(s) so far. Saw ${d.gifts.other} non-anon and ${d.gifts.anon} anon gifts.`);
	return;
}).catch((err) => {
	printtolog(LOG_WARN, `<trilaud> error while trying to access the server/process the reply: ${err}`);4
	reject("http error while trying to access the trilaud server");
	return;
});


})
}

