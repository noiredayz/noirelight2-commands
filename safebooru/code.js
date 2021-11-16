const {printtolog, getRndInteger, locateCharInStr, cleanupArray} = require(process.cwd()+"/lib/nlt-tools.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const sfbBaseURL = "https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&limit=50&tags=";

const cringeTags = ["loli", "shouta", "contentious_content", "furry", "furrification", "scalie"]; //to be expanded as necessary

exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise ((resolve, reject) => {

let cmdline, incmd;

switch(target_context){
	case "twitch":
		cmdline = fullmsg.messageText.substr(1);	//full message excluding the prefix
		incmd 	= cleanupArray(cmdline.split(" "));				//same but split
		break;
	//placeholder for other contexts that may require extra handling Okayeg
	default:
		return;
		//cmdline = fullmsg.substr(1);
		//incmd	= cmdline.split(" ");
		break;
}
if(nlt.channels[target_channel].links===0){
	resolve("this command cannot be used in channels where links are disabled.");
	return;
}
if(incmd.length===1){
	resolve("please specify at least one tag to search for");
	return;
}

const cltl = cmdline.toLowerCase();
if(cltl.includes("rating:questionable") || cltl.includes("rating:explicit") || cltl.includes("-rating:safe")){
	resolve("why are you trying to find NSFW images on SAFEbooru again? Pepega Clap");
	return;
}
for(const e of incmd){
	if(cringeTags.findIndex(t => t===e.toLowerCase())!=-1){
		resolve("your search contains at least one disallowed tags.");
		return;
	}
}
if(incmd.length>6){
	resolve("5 tags maximum weirdEg");
	return;
}
let gburl = sfbBaseURL+encodeURI(cmdline.substr(locateCharInStr(cmdline, " ", 1)));
const https_options = {
	url: gburl,
	method: "GET",
	headers: {
		"User-Agent": nlt.c.userAgent
	},
	timeout: 10000,
	retry: 0
};
nlt.got(https_options).json().then((d) => {
	if(d.length===0){
		resolve("couldn't find any images for your query.");
		return;
	}
	let iidx = getRndInteger(0, d.length-1);
	//resolve(`https://safebooru.org/index.php?page=post&s=view&id=`+d[iidx].id+` https://safebooru.org//images/`+d[iidx].directory+`/`+d[iidx].image);
	const tagArray = d[iidx].tags.split(" ");
	for(const e of tagArray){
	if(cringeTags.findIndex(t => t===e.toLowerCase())!=-1){
		resolve("your search result contained at least one disallowed tags.");
		return;
		}
	}
	const tstamp = new Date(d[iidx].change*1000);
	let scorestr="";
	if(d[iidx].score) scorestr = "score: "+d[iidx].score;	//shit's null all the time, even if you search for score:4 for example. API error?
	resolve(`[${iidx+1}/${d.length}] Uploaded: ${tstamp.toUTCString()}${scorestr} 🖼 https://safebooru.org/index.php?page=post&s=view&id=`+d[iidx].id);
	return;
	
}).catch((err) => {
	printtolog(LOG_WARN, `<safebooru> error while trying to search for ${encodeURI(cmdline.substr(locateCharInStr(cmdline, " ", 1)))}: ${err}`);
	reject(`http error while trying to perform your query`);
	return;
});

})
}

