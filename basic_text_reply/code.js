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

const chmode = nlt.util.tlToStr(nlt.channels[target_channel].chmode);

switch(incmd[0]){
	case 'website':
		resolve("Command list only for the time being: http://noiresbot.noiredayz.link/bot/commands.html");
		break;
	case 'api':
		resolve("API is not currently operational saj");
		break;
	case 'bot':
		resolve(`${nlt.c.twitch.username} is a bot operated by ${nlt.c.usr_admin}. Channel mode: ${chmode} Also see: ${nlt.c.cmd_prefix}node ${nlt.c.cmd_prefix}version`);
		break;
	case 'version':
		resolve(`noirelight2 v${nlt.c.bver}, written by noiredayz, in n OMEGALUL de-js. See also: ${nlt.c.cmd_prefix}node and ${nlt.c.cmd_prefix}bot `);
		break;
	case 'noirelight2':
	case 'nlt2':
		let copeemote = "Copesen";
		if(nlt.channels[target_channel].name === "pajlada") copeemote = "pajaCope";
		if(nlt.channels[target_channel].name === "forsen") copeemote = "Copesen";
		resolve(`Re-structuring the bot and rewriting features will definitely fix the development hell it was in ${copeemote}`);
		return;
		break;
	case 'nlt1':
	case 'noirelight1':
		resolve(`We don't talk about the first version of the bot and its other two predecessors TrollDespair`);
		return;
		break;
	case 'node':
		resolve(`The current instance is running on ${nlt.os.platform}, node version: ${process.versions.node}, v8 version: ${process.versions.v8}`);
		break;
	case 'channelmode':
	case 'whatisthechannelmode':
		resolve(`Current channel mode: ${chmode}`);
		break
	case 'commands':
		resolve(`Okayeg https://noiresbot.noiredayz.link/bot/commands.html`);
		break;
	default:
		nlt.util.printtolog(16, `<warn> Module basic_text_reply got an unknown command: ${incmd[0]}`);
		reject(`internal command error (invalid alias ${incmd[0]})`);
}
return;
})
}

