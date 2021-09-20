const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog} = require(process.cwd()+"/lib/nlt-tools.js");
const {nsfwCheckURL, thumbnailExists} = require(process.cwd()+"/lib/nlt-got.js");

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

const valid_heights = ["160p", "360p", "480p", "720p", "1080p"];
const resolutions = ["284x160", "640x360", "848x480", "1280x720", "1920x1080"];
if (incmd.length===1){
	resolve("streamthumb: Must specify a channel. Optionally you can specify an image height as second parameter (standard 16:9 resultions' height)");
	return;
} 
let retval;
switch(incmd[0]){
	case "st":
	case "streamthumb":
		if(nlt.channels[target_channel].links===0){
			resolve("this command cannot be used in channels where links are disabled.");
			return;
		}
		if(incmd.length>2){
			if(!valid_heights.find(i => i=== incmd[2])){
					resolve(`invalid resolution ${incmd[2]} valid ones are 160p 360p 480p 720p 1080p. Default is full HD.`);
					return;
				} else {
					retval = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${incmd[1].toLowerCase()}-${resolutions[valid_heights.findIndex(i => i===incmd[2])]}.jpg`;
				}
			} else {
				retval = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${incmd[1].toLowerCase()}-1920x1080.jpg`;
		}
		thumbnailExists(retval).then((d)=>{
			if(d){
				resolve(retval);
				return;
			} else {
				resolve("channel is offline or doesn't have a thumbnail with that resolution yet. If the streamer just started streaming wait a few minutes.");
				return;
			}
			}).catch((err) =>{
				printtolog(LOG_WARN, `<streamthumb> http error while trying to check if thumbnaile exists: ${err}`);
				resolve(`your thumbnail (might be 404, couldn't check it): ${retval}`);
				return;
			});
		break;
	case "stcheck":
	case "streamthumbcheck":
		const tURL = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${incmd[1].toLowerCase()}-1920x1080.jpg`;
		try{
			retval = await thumbnailExists(tURL);
		}
		catch(err){
			printtolog(LOG_WARN, `<streamthumb> http error while trying to check if thumbnaile exists: ${err}`);
			resolve("couldn't check if the thumbnail for that channel exists, so not doing the NSFW check. You can still retrieve the thumb using st.");
			return;
		}
		if(!retval){
			resolve("channel is offline or doesn't have a thumbnail with that resolution yet. If the streamer just started streaming wait a few minutes.");
			return;
		}
		nsfwCheckURL(tURL).then((data) => {
			if(nlt.channels[target_channel].links===0){
				resolve(`Channel: #${incmd[1].toLowerCase()} ${data}`);
				return;
			} else {
				resolve(`Image: ${tURL} ${data}`);
				return;
			}
		}).catch((errVal) => {
			nlt.util.printtolog(4, `<stcheck> got/API error while trying to process the request: ${errVal}`);
			reject(`http error while trying to run the API request.`);
		});
		break;
		default:
			reject("internal command error (unknown alias)");
			printtolog(LOG_WARN, `<streamthumb> invalid alias ${incmd[0]}`);
		break;
	}	


});
}

