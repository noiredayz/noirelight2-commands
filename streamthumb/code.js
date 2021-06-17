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

const valid_heights = ["160p", "360p", "480p", "720p", "1080p"];
const resolutions = ["284x160", "640x360", "848x480", "1280x720", "1920x1080"];
if (incmd.length===1){
	resolve("streamthumb: Must specify a channel. Optionally you can specify an image height as second parameter (standard 16:9 resultions' height)");
	return;
} 

if(incmd.length>2){
	if(!valid_heights.find(i => i=== incmd[2])){
			resolve(`invalid resolution ${incmd[2]} valid ones are 160p 360p 480p 720p 1080p. Default is 440x248p.`);
			return;
		} else {
			resolve(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${incmd[1].toLowerCase()}-${resolutions[valid_heights.findIndex(i => i===incmd[2])]}.jpg`);
			return;
		}
	} else {
		resolve(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${incmd[1].toLowerCase()}-440x248.jpg`);
		return;
	}

});
}

