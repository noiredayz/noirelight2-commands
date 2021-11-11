const {printtolog, cleanupArray} = require(process.cwd()+"/lib/nlt-tools.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {nsfwCheckURL} = require(process.cwd()+"/lib/nlt-got.js");

exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise (async (resolve, reject) => {

let cmdline, incmd;

switch(target_context){
	case "twitch":
		cmdline = fullmsg.messageText.substr(1);	//full message excluding the prefix
		incmd 	= cmdline.split(" ");				//same but split
		incmd	= cleanupArray(incmd);
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

let rrows, minID, maxID, tarID, tURL, checkdata;

if (incmd.length > 1){
	tarID = sources.findIndex(e => e.toLowerCase() === incmd[1].toLowerCase());
	if(tarID === -1){
		resolve(`invalid channel provided`);
		return;
	}
	//extremely ineffective way, it is possible to do this as less pepege way? 
	rrows = await nlt.tldb.PselectQuery(`SELECT * FROM tl WHERE src='${tarID}' ORDER BY RANDOM() LIMIT 1;`);
} else {
	rrows = await nlt.tldb.PselectQuery("SELECT MIN(id) AS minID FROM tl;");
	minID = rrows[0].minID;
	rrows = await nlt.tldb.PselectQuery("SELECT MAX(id) AS maxID FROM tl;");
	maxID = rrows[0].maxID;

	do {
		//keep rerolling until we get a valid record. this mitigates possible holes in the db
		//caused by necessary deletions like PedoBear, monkaTOS or personal information
		tarID = nlt.util.getRndInteger(minID, maxID);
		rrows = await nlt.tldb.PselectQuery(`SELECT * FROM tl WHERE id='${tarID}';`);
	} while (rrows.length===0);
}
tURL = rrows[0].url;
if(tURL.startsWith("http:")) tURL = tURL.replace("http", "https");

try {
	checkdata = await nsfwCheckURL(tURL);
}
catch(err){
	printtolog(LOG_WARN, `<tl> Error while trying to NSFW check ${tURL}: ${err}`);
	reject("NSFW API check failed monkaS");
	return;
}

if(incmd.length===1)
	resolve(`Channel: ${sources[rrows[0].src].toLowerCase()} Image: ${tURL} ${checkdata}`);
else	
	resolve(`Image: ${tURL} ${checkdata}`);

})
}

const sources = ["Admiralbulldog","Alinity","Andymilonakis","Asmongold","Athenelive","B0aty","Becca","C9sneaky","Cdewx","Celeste","Cowsep","Dansgaming","Darksydephil","Dekar173","Demolition_d","Destinygg","Eloise","Forsen","Geersart","Greekgodx","Grossie_gore","Iam_choa","Ice_poseidon","Jaxerie","Kaceytron","Legendarylea","Loltyler1","Meteos","Mitchjones","Nani","Naniwasc2","Nmplol","Nymn","Pajlada","Reckful","Sick_nerd","Singsing","Sodapoppin","Xqcow"];

