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
		cmdline = fullmsg.substr(1);
		incmd	= cmdline.split(" ");
		break;
}
if(nlt.channels[target_channel].links===0){
	resolve("this command cannot be used in channels where links are disabled.");
	return;
}
let tuser, temote, tindex=1, tmethod=0;

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
	} else {
		temote = incmd[1];
	}
let bttvurl = `https://api.betterttv.net/3/emotes/shared/search?query=${temote}&offset=0&limit=50`;
const https_options = {
	url: bttvurl,
	method: 'GET',
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
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

if(emotedata.length===0){
	resolve(`no emote matching the criteria was found`);
	return;
}
if(emotedata.message){
	reject(`API error: ${emotedata.message}`);
	return;
}

if(tindex>emotedata.length) tindex = emotedata.length;
if(tmethod===1){
	let rindex = emotedata.findIndex(e => e.user.name === tuser);
	if(rindex === -1){
		resolve(`target user ${tuser} has no public emote named ${temote} available.`);
		return;
	} else {
		resolve(`https://betterttv.com/emotes/${emotedata[rindex].id}`);
		return;
	}
} else {
	resolve(`emote "${tindex}" (from the total of ${emotedata.length}): https://betterttv.com/emotes/${emotedata[tindex-1].id}`);
	return;
}

})	//end of Promise

}	//end of command
