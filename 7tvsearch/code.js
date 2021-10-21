const {printtolog, locateCharInStr} = require(process.cwd()+"/lib/nlt-tools.js");
const {parseCmdParam} = require(process.cwd()+"/lib/nlt-paramparser.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");

const searchLimit = 50; //TODO: ask AnatoleAM what should this be 

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
	resolve("please specify at least an emote name to search for.");
	return;
}
const scmd = parseCmdParam(cmdline.substr(locateCharInStr(cmdline, " ")+1));
if(!scmd){
	reject("unable to parse parameters.");
	return;
}
if(scmd.freestr.length===0){
	resolve("please specify an emote name to search for.");
}
if(scmd.i){
	if(isNaN(scmd.i) && scmd.i!="random"){
		resolve("index must be a number from 1 to "+searchLimit+" or 'random'");
		return;
	}
	if(scmd.i<1 || scmd.i>searchLimit || !Number.isInteger(scmd.i)){
		resolve("index must be a whole number from 1 to "+searchLimit+" or 'random'");
		return;
	}
}




})
}

function generateSearchQuery(searchfor, pagesize, globalstate, sortby, sortorder, channelemote, author){
	return {
	"query":"query($query: String!,$page: Int,$pageSize: Int,$globalState: String,$sortBy: String,$sortOrder: Int,$channel: String,$submitted_by: String,$filter: EmoteFilter) {search_emotes(query: $query,limit: $pageSize,page: $page,pageSize: $pageSize,globalState: $globalState,sortBy: $sortBy,sortOrder: $sortOrder,channel: $channel,submitted_by: $submitted_by,filter: $filter) {id,visibility,owner {id,display_name,role {id,name,color},banned}name,tags}}",
	"variables":{
		"query": searchfor,
		"page":1,
		"pageSize": pagesize,
		"limit": pagesize,
		"globalState": globalstate,
		"sortBy":sortby,
		"sortOrder": sortorder,
		"channel": channelemote,
		"submitted_by": author
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

