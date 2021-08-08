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


//TODO: handle target source channel as parameters
//TODO: find out which row means which number


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

let rrows, minID, maxID, tarID, tURL;

rrows = await nlt.tldb.PselectQuery("SELECT MIN(id) AS minID FROM tl;");
if(!rrows || rrows.length===0){
	nlt.util.printtolog(4, `<tl> sqlite error while selecting minimum ID`);
	reject("sqlite error");
	return;
}
minID = rrows[0].minID;
rrows = await nlt.tldb.PselectQuery("SELECT MAX(id) AS maxID FROM tl;");
if(!rrows || rrows.length===0){
	nlt.util.printtolog(4, `<tl> sqlite error while selecting maximum ID`);
	reject("sqlite error");
	return;
}
maxID = rrows[0].maxID;

tarID = nlt.util.getRndInteger(minID, maxID);
//nlt.util.printtolog(4, `<tl> min: ${minID} max: ${maxID} target: ${tarID}`);

rrows = await nlt.tldb.PselectQuery(`SELECT * FROM tl WHERE id='${tarID}';`);
//nlt.util.printtolog(4, JSON.stringify(rrows));
if(!rrows || rrows.length===0){
	nlt.util.printtolog(4, `<tl> sqlite error while selecting an image for tl`);
	reject("sqlite error");
	return;
}

tURL = rrows[0].url;

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
	//nlt.util.printtolog(4, `<tl> TriDance we received data: ${JSON.stringify(data)}`);
	let retval="";
	if(data.output.nsfw_score){
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

})
}

