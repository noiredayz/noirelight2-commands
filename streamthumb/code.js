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
					resolve(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${incmd[1].toLowerCase()}-${resolutions[valid_heights.findIndex(i => i===incmd[2])]}.jpg`);
					return;
				}
			} else {
				resolve(`https://static-cdn.jtvnw.net/previews-ttv/live_user_${incmd[1].toLowerCase()}-1920x1080.jpg`);
				return;
		}
		break;
	case "stcheck":
	case "streamthumbcheck":
		const tURL = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${incmd[1].toLowerCase()}-1920x1080.jpg`;
		let tlHttpOpts = {	method: "POST",
					responseType: "json",
					url: "https://api.deepai.org/api/nsfw-detector",
					headers: {
						"Api-Key": nlt.c.deepai_key
					},
					form: {
						image: tURL
					}
				};
		nlt.got(tlHttpOpts).json().then((data) => {
			let retval="";
			if(data.output.nsfw_score){
				if(nlt.channels[target_channel].links===0)
					retval = `Channel: #${incmd[1].toLowerCase()} NSFW score: ${nlt.util.floatToPercentText(data.output.nsfw_score)}%, detection(s): `;
				else
					retval = `Image: ${tURL} NSFW score: ${nlt.util.floatToPercentText(data.output.nsfw_score)}%, detection(s): `;
				if (data.output.detections.length===0){
					retval += "none";
					resolve(retval);
					return;
				} else {
					for(let i=0; i<data.output.detections.length;i++){
						retval += `${shortCatText(data.output.detections[i].name)} (${nlt.util.floatToPercentText(data.output.detections[i].confidence)}%) `;
					}
					resolve(retval);
					return;
				}
			}	
		}).catch((errVal) => {
			nlt.util.printtolog(4, `<twitchlotto> got/API error while trying to process the request: ${errVal}`);
			reject(`got error while trying to run the API request.`);
		});
		break;
		default:
			reject("internal command error (unknown alias)");
			nlt.util.printtolog(4, `<streamthumb> invalid alias ${incmd[0]}`);
		break;
	}	


});
}

function shortCatText(inText){
	switch(inText){
		case "Male Breast - Exposed":
			return "male breast";
			break;
		case "Male Genitalia - Exposed":
			return "penis";
			break;
		case "Male Genitalia - Covered":
			return "penis (covered)";
			break;
		case "Female Genitalia - Exposed":
			return "vagina";
			break;
		case "Female Breast - Exposed":
			return "breast";
			break;
		case "Female Breast - Covered":
			return "covered breast";
			break;
		case"Buttocks - Exposed":
			return "ass";
			break;
		default:
			return inText;
			break;
	}
}
