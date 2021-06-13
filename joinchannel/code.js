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

if (incmd.length != 3){
	resolve(`usage: ${nlt.c.cmd_prefix+incmd[0]} <channel> <initial chmode>`);
	return;
}
if(incmd[1].length<2){
	resolve(`${incmd[1]} doesn't look like a twitch channel's name.`);
	return;
}
if(!nlt.util.valid_chmodes.has(incmd[2])){
	resolve(`${incmd[2]} is not a valid channel mode. Valid ones are 0, 1, 2, S`);
	return;
}
if(nlt.chctl.findChannel(incmd[1], "twitch") != -1){
	resolve(`that channel is already intialized. Current channel mode: ${nlt.channels[incmd[1]].chmode}.`);
	return;
}
let rrows;
rrows = nlt.maindb.selectQuery(`SELECT * FROM channels WHERE name='${incmd[1]}' AND context='twitch';`);
if (rrows.length>0){
	resolve(`that channel is already in the db, but not in the cache pepegaSitWhat this should have never happened PAJAS`);
	return;
}
rrows = nlt.maindb.insertQuery(`INSERT INTO channels
								(name, chmode, chid, context)
								VALUES
								('${incmd[1].toLowerCase()}', '${incmd[2]}', '0', 'twitch');`);
rrows = nlt.maindb.selectQuery(`SELECT * FROM channels WHERE name='${incmd[1].toLowerCase()}' AND context='twitch';`);
nlt.chctl.LoadSingleChannel(rrows[0]);
if(incmd[2] === "0"){
	resolve(`successfully added channel ${incmd[1]}, but since the specified channelmode was 0 not joining it.`);
	return;
}								
nlt.ss["twitch"].joinTwitchChannel(incmd[1].toLowerCase()).then(() => {
	resolve(`successfully added and joined Twitch channel ${incmd[1]}.`);
	return;
}).catch((err) => {
	resolve(`managed to add and store Twitch channel ${incmd[1]}, but couldn't join it: ${err}`);
	return;
});

})
}

