const {printtolog, locateCharInStr} = require(process.cwd()+"/lib/nlt-tools.js");
const {parseCmdParam} = require(process.cwd()+"/lib/nlt-paramparser.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");

//AnatoleAM on Discord said the limits are
//150 for v2
//300 for v3
const searchLimit = 100;	//default is 100, still the double of bttv and ffz search KUKLE
const searchAPI = "https://api.7tv.app/v2/gql";

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

let tIDX = 1;

if(incmd.length===1){
	resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `Usage: ${nlt.c.cmd_prefix+incmd[0]} <emote name>`});
	return;
}
const scmd = parseCmdParam(cmdline.substr(locateCharInStr(cmdline, " ")+1));
if(!scmd){
	reject({status: "errored", err: new Error("unable to parse parameters")});
	return;
}
if(scmd.freestr.length===0){
	resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `You must specify an emote name to search for Weirdga`});
}
if(scmd.i){
	if(isNaN(scmd.i) && scmd.i!="random"){
		resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `Index must be a number from 1 to ${searchlimit} or "random"`});
		return;
	}
	if(scmd.i<1 || scmd.i>searchLimit || !Number.isInteger(scmd.i)){
		resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `Index must be a number from 1 to ${searchlimit} or "random"`});
		return;
	}
	tIDX = scmd.i;
}
if(scmd.author){
	if(scmd.author.length>25 || scmd.author.length<3){
		resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `Invalid author name (must be >=3 and <=25 characters long)`});
		return;
	}
}
//WTB specifying paramters by name, your titansteel+my mats+tip MLADA
const sQuery = JSON.stringify(generateSearchQuery(scmd.freestr, searchLimit, null, "popularity", 0, null, scmd.author?scmd.author:null));
console.log("SEARCH QUERY WAYTOODANK:\n"+sQuery);

const https_options = {
	url: searchAPI,
	method: "POST",
	headers: {
		"user-agent": nlt.c.userAgent,
		"accept": "application/json",
		"origin": "https://7tv.app",
		"referer": "https://7tv.app",
		"content-length": sQuery.length
		
	},
	body: sQuery,
	retry: 1,
	timeout: 3000
};

let dsa, retval;
try{
	const {statusCode} = await nlt.got({url: searchAPI, method: "OPTIONS", headers: {"user-agent": nlt.c.userAgent, "origin": "https://7tv.app", "referer": "https://7tv.app"}});
	printtolog(LOG_DBG, `<7tv> GQL OPTIONS query result: ${statusCode}`);
	dsa = await nlt.got(https_options);
}
catch(gerr){
	reject({status: "errored", err: gerr});
	return;
}
console.log(`request body: "${dsa.body}"`);
retval = JSON.parse(dsa.body);
if(retval.length === 0){
	resolve({status: "failed", hasLink: false, setCooldown: "normal", msg: `Server sent back empty reply.`});
	return;
}
console.log(retval);

const emotes = retval.data.search_emotes;

if(emotes.legth === 0){
	resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `No emotes matching the criteria were found.`});
	return;
}
if(emotes.length > tIDX) tIXD = emotes.length-1;

resolve({
	status: "success",
	hasLink: true,
	setCooldown: "normal",
	msg: `Emote [${tIDX+1}/${emotes.length}]: ${emotes[tIDX].name} https://7tv.app/emotes/${emotes[tIDX].id}`});



})
}

function generateSearchQuery(searchfor, pagesize, globalstate, sortby, sortorder, channelemote, author){
	return {
	"query":"query($query: String!,$page: Int,$pageSize: Int,$globalState: String,$sortBy: String,$sortOrder: Int,$channel: String,$submitted_by: String,$filter: EmoteFilter) {search_emotes(query: $query,limit: $pageSize,page: $page,pageSize: $pageSize,globalState: $globalState,sortBy: $sortBy,sortOrder: $sortOrder,channel: $channel,submitted_by: $submitted_by,filter: $filter) {id,visibility,owner {id,display_name,role {id,name,color},banned}name,tags}}",
	"variables":{
		"query": searchfor,
		"page": 1,
		"pageSize": pagesize,
		"limit": pagesize,
		"globalState": globalstate,
		"sortBy": sortby,
		"sortOrder": sortorder,
		"channel": channelemote,
		"submitted_by": author
		}
	}
}

//gql search query cvPaste-d straight from the website
//Anatole said it's OK to use gql
const example_gql = {
	"query":"query($query: String!,$page: Int,$pageSize: Int,$globalState: String,$sortBy: String,$sortOrder: Int,$channel: String,$submitted_by: String,$filter: EmoteFilter) {search_emotes(query: $query,limit: $pageSize,page: $page,pageSize: $pageSize,globalState: $globalState,sortBy: $sortBy,sortOrder: $sortOrder,channel: $channel,submitted_by: $submitted_by,filter: $filter) {id,visibility,owner {id,display_name,role {id,name,color},banned}name,tags}}",
	"variables":{
		"query":"bruh",
		"page":1,
		"pageSize":7,
		"limit":7,
		"globalState":null,
		"sortBy":"popularity",
		"sortOrder":0,
		"channel":null,
		"submitted_by":null
	}
};

