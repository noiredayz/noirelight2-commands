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

let rrows;
if (incmd.length < 2){
	rrows = nlt.maindb.selectQuery(`SELECT * FROM pogchamp ORDER BY id DESC LIMIT 1;`);
	resolve(`last PogChamp recorded: on ${rrows[0].date} it was ${rrows[0].comment}: ${rrows[0].emote}`);
	return;
}

if (!Date.parse(incmd[1])){
	resolve("parameter should be date, in YYYY-MM-DD format");
	return;
}

rrows = nlt.maindb.selectQuery(`SELECT * FROM pogchamp WHERE date='${incmd[1]}';`);
if(!rrows || rrows.length === 0){
	resolve(`no data found for the specified date.`);
	return;
} else {
	resolve(`PogChamp on ${incmd[1]} was ${rrows[0].comment}: ${rrows[0].emote}`);
	return;
}

})
}

