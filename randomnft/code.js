const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog, getRndInteger, stringCheck} = require(process.cwd()+"/lib/nlt-tools.js");
const crypto = require("crypto");

const maxThumbnailSizeMB = 1;
//const apiURL ="https://api.opensea.io/api/v1/assets";
const thumbReplacement = "https://i.nuuls.com/1zM7z.jpeg";	//ZULUL


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
		return;
		//cmdline = fullmsg.substr(1);
		//incmd	= cmdline.split(" ");
		break;
}
if(nlt.channels[target_channel].links==0){
	reject("this command cannot be used in channels where links are disabled.");
	return;
}

if(!stringCheck(nlt.c.fakeOpenSea)){
	reject("missing fake openSEA API provider from the config");
}

let retval = nlt.cache.getd("opensea-assets");
if(!retval){
	const https_options = {
		method: "GET",
		url: nlt.c.fakeOpenSea,
		headers: { "user-agent": nlt.c.userAgent },
			timeout: 1000,
		retry: 1};

	try {
		retval = await nlt.got(https_options);
		retval = JSON.parse(retval.body);
	}
	catch(err){
		printtolog(LOG_WARN, `<randomnft> http error while trying to GET from mock API: ${err}`);
		reject("http error while trying to access provider.");
		return;
	}
	nlt.cache.setd("opensea-assets", retval, 120);
}

let tdata, tdrows;
do{
 tdata = retval.assets[getRndInteger(0, retval.assets.length)];
 tdrows = nlt.maindb.selectQuery(`SELECT * FROM nft WHERE link='${tdata.permalink}';`);
} while (tdrows.length>0);	//make sure we don't make duplicate entries
//it's totally safe to put this in an infinite loop Clueless TeaTime

let tth, thumbstat;
try{
	thumbstat = await thumbnailSizeCheck(tdata.image_thumbnail_url);
}
catch(err){
	tth = thumbReplacement;
}
if(thumbstat)
	tth = thumbReplacement;
else
	tth = tdata.image_thumbnail_url;
const tUID = getNewUID();

const tname = tdata.name.replaceAll("'", "''");
const tdesc = tdata.description ? tdata.description.replaceAll("'", "''") : "(no description)";

nlt.maindb.insertQuery(`INSERT INTO nft
						(uid, title, link, thumbnail, desc)
						VALUES
						('${tUID}', '${tname}', '${tdata.permalink}', '${tth}', '${tdesc}') ;`);

resolve(`https://bot.noiredayz.link/bot/nft.php?id=${tUID} your random NFT from https://opensea.io (don't steal ;) ): ${tdata.name} `);
})
}

function thumbnailSizeCheck(inURL){
return new Promise((resolve, reject) => {
	if(inURL.length===0){
		reject("empty parameter");
		return;
	}
	const https_options = {
		method: "HEAD",
		url: inURL
	};
	nlt.got(https_options).then((d) => {
		if(d.headers["content-length"]>maxThumbnailSizeMB*1024*1024)
			resolve(true);
		else
			resolve(false);
	}).catch((err) => {
		printtolog(LOG_WARN, `<randomnft> sizecheck: http error: ${err}`);
		reject("http error");
	});
});
}


function getNewUID(){
	let a="", rv;
	do{
		a = crypto.randomBytes(20).toString('hex').slice(-10);
		rv = nlt.maindb.selectQuery(`SELECT * FROM nft WHERE uid='${a}';`);
	} while (rv.length!=0);
	return a;
}

