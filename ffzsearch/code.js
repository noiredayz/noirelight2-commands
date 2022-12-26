const {cleanupArray} = require(process.cwd()+"/lib/nlt-tools.js");

exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise (async (resolve, reject) => {

let cmdline, incmd;

switch(target_context){
	case "twitch":
		cmdline = fullmsg.messageText.substr(1);	//full message excluding the prefix
		incmd 	= cleanupArray(cmdline.split(" "));				//same but split
		break;
	//placeholder for other contexts that may require extra handling Okayeg
	default:
		cmdline = fullmsg.substr(1);
		incmd	= cmdline.split(" ");
		break;
}
if(nlt.channels[target_channel].links===0){
	resolve("this command cannot be used in channels where links are disabled.");
	return;
}
let tuser, temote, tindex=1, tmethod=0, ffzurl;

if(incmd.length<2){
	resolve(`usage: ${nlt.c.cmd_prefix+incmd[0]} <optional uploader name:><emotename> <optional index 0-49>`);
	return;
}
if(incmd.length>2 && isNaN(incmd[2])){
	resolve(`index must be a number 1-50. If there are less results the last will be returned.`);
	return;
}
if(incmd.length>2) tindex=Number(incmd[2]);
if(tindex<1 || tindex>50 || !Number.isInteger(tindex)){
	resolve(`index is out of range (must be between 1-50)`);
	return;
}

if(incmd[1].includes(":")){
	tmethod=1;
	tuser = incmd[1].split(":")[0].toLowerCase();
	temote = incmd[1].split(":")[1].toLowerCase();
	if(tuser.length===0){
		resolve(`username must not be null. Ommit : from the search string if you don't want to search for any specific user`);
		return;
	}
	if(temote.length<2){
		resolve(`invalid emote name(too short or null)`);
		return;
		}
	ffzurl = `https://api.frankerfacez.com/v1/emotes?q=${temote}&owner=${tuser}&sensitive=false&sort=name-asc&high_dpi=off&page=1&per_page=50`;
} else {
	temote = incmd[1];
	ffzurl=`https://api.frankerfacez.com/v1/emotes?q=${temote}&sensitive=false&sort=name-asc&high_dpi=off&page=1&per_page=50`;
}

const https_options = {
	url: ffzurl,
	method: 'GET',
	headers: {
		'User-Agent': nlt.c.userAgent,
		'Accept': 'application/json'
	},
	timeout: 2000,
	retry: 0 };
let gotresult;
try{
	gotresult = await nlt.got(https_options);
}
catch(err){
	nlt.util.printtolog(2, `<bttv search> got error while running query: ${err}`);
	reject(`got error while running the query`);
	return;
}
if(gotresult.statusCode != 200){
	reject(`HTTP error ${gotresult.statusCode} while trying to make the request.`);
	return;
}
let emotedata;
try{
	emotedata = JSON.parse(gotresult.body);
}
catch(err){
	nlt.util.printtolog(2, `<bttv search> unable to parse JSON data "${gotresult.body}"`);
	reject(`internal command error trying to parse JSON reply monkaS`);
	return;
}

if(emotedata._total===0){
	if(tmethod){
		resolve(`specified user has no emotes named ${temote}.`);
		return;
	} else {
		resolve(`no emote named ${temote} was found`);
		return;
	}
}

if(tindex>emotedata.emoticons.length) tindex = emotedata.emoticons.length;
if(emotedata._total<50){
	resolve(`emote "${tindex}" (from the total of ${emotedata._total}): https://www.frankerfacez.com/emoticon/${emotedata.emoticons[tindex-1].id}`);
	return;
} else {
	resolve(`emote "${tindex}" (from the total of 50+): https://www.frankerfacez.com/emoticon/${emotedata.emoticons[tindex-1].id}`);
	return;
}


})	//end of Promise

}	//end of command
