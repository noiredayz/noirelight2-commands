const {printtolog, locateCharInStr, validateTwitchUsername, getRndInteger, dcmdr, cleanupArray} = require(process.cwd()+"/lib/nlt-tools.js");
const {parseCmdParam} = require(process.cwd()+"/lib/nlt-paramparser.js");
const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");

//AnatoleAM on Discord said the limits are
//150 for v2
//300 for v3
const searchLimit = 100;	//default is 100, still the double of bttv and ffz search KUKLE

exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise (async (resolve, reject) => {

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

let tIDX = 1;
let sOrder = "popularity";
let sDirection = "DESCENDING";
let sIgnoreTags = false;
let sExactMatch = false;

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
	return;
}

if(scmd.order){
	for(const x of ["age", "uploaded", "date"]){
		if(scmd.order === x) sOrder = "age";
	}
}

if(scmd.notags === 1 || scmd.ignoretags === 1 || scmd.itg === 1){
	sIgnoreTags = true;
}

if(scmd.exact === 1 || scmd.e === 1){
	sExactMatch = true;
}

if(scmd.dir === 1 || scmd.d === 1){
	sDirection = "ASCENDING";
}

if(scmd.i){
	switch(typeof(scmd.i)){
		case "string":
			if(scmd.i.toLowerCase()!="random"){
				resolve(dcmdr("cmdfail", false, "normal", `index must be a number between 1 and ${searchLimit} or "random"`));
				return;
			}
			break;
		case "number":
			if(scmd.i<1 || scmd.i>searchLimit || !Number.isInteger(scmd.i)){
				resolve(dcmdr("cmdfail", false, "normal", `numeric index must be a number between 1 and ${searchLimit} (or specify "random" for a randomly choosen result)`));
				return;
			}
			break;
		default:
			if(scmd.i.toLowerCase()!="random"){
				resolve(dcmdr("cmdfail", false, "normal", ``));
				return;
			}
	}
	tIDX = scmd.i;
}
if(scmd.author){
	if(!validateTwitchUsername(scmd.author)){
		resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `Invalid author name (not a valid Twitch username)`});
		return;
	}
}

const searchEmote = scmd.freestr.split(" ")[0];
const NaM = {
   "operationName":"SearchEmotes",
   "variables":{
      "query": searchEmote,
      "limit": searchLimit,
      "page":1,
      "sort":{
         "value": sOrder,
         "order": sDirection
      },
      "filter":{
         "category":"TOP",
         "exact_match": sExactMatch,
         "case_sensitive":false,
         "ignore_tags": sIgnoreTags,
         "zero_width": false,
         "animated":false,
         "aspect_ratio":""
      }
   },
   "query":"query SearchEmotes($query: String!, $page: Int, $sort: Sort, $limit: Int, $filter: EmoteSearchFilter) {\n  emotes(query: $query, page: $page, sort: $sort, limit: $limit, filter: $filter) {\n    count\n    items {\n      id\n      name\n      state\n      trending\n      owner {\n        id\n        username\n        display_name\n        style {\n          color\n          paint_id\n          __typename\n        }\n        __typename\n      }\n      flags\n      host {\n        url\n        files {\n          name\n          format\n          width\n          height\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}"
}			

const httpsOptions = {
	url: "https://7tv.io/v3/gql",
	method: "POST",
	headers: { "content-type": "application/json",
			   "user-agent": nlt.c.userAgent },
	body: JSON.stringify(NaM),
	timeout: 10000,
	retry: 1,
	throwHttpErrors: false};

let eidx=0;	
nlt.got(httpsOptions).then((result) =>{
		switch(result.statusCode){
			case 404:
				resolve(dcmdr("cmdfail", false, "normal", "no emote found with your query."));
				return;
			case 200:
				//emote found PagMan
				break;
			default:
				resolve(dcmdr("errored", false, "error", `7tv API returned with an unexpected response code (${result.statusCode})`));
				return;
			}
		const d = JSON.parse(result.body);
		if(!d.data){
			resolve(dcmdr("errored", false, "error", "7tv API returned an empty set, this shouldn't happen."));
			return;
		}
		const r = d.data.emotes.items;
		if(d.data.emotes.count===0){
			resolve(dcmdr("cmdfail", false, "normal", "no emote found with your query."));
			return;
		}
		if(tIDX === "random")
			eidx = getRndInteger(0, r.length);
		if(typeof(tIDX) === "number"){
			if(tIDX>r.length+1){
				resolve(dcmdr("cmdfail", false, "normal", `index out of range, you asked for ${tIDX} but only ${r.length} emote(s) were found`));
				return;
			} else {
				eidx = tIDX-1;
			}
		}
		resolve(dcmdr("success", true, "normal", `[${eidx+1}/${r.length}] "${r[eidx].name}" https://7tv.app/emotes/${r[eidx].id}`));
		return;
}).catch((err) => {
	printtolog(LOG_WARN, `7tv: http error: ${err}`);
	resolve(dcmdr("errored", false, "error", "http error while trying to query 7tv gql"));
	return;
});	


});
}


/* v2 parameter backup
 * const OldNaM = {"query":"query($query: String!,$page: Int,$pageSize: Int,$globalState: String,$sortBy: String,$sortOrder: Int,$channel: String,$submitted_by: String,$filter: EmoteFilter) {search_emotes(query: $query,limit: $pageSize,page: $page,pageSize: $pageSize,globalState: $globalState,sortBy: $sortBy,sortOrder: $sortOrder,channel: $channel,submitted_by: $submitted_by,filter: $filter) {id,visibility,urls,owner {id,display_name,role {id,name,color},banned}urls,name,tags}}",
			 "variables":{
				 "query": searchEmote,
				 "page":1,
				 "pageSize":searchLimit,
				 "limit":searchLimit,
				 "globalState": "hide",
				 "sortBy": sOrder,
				 "sortOrder": sDirection,
				 "channel":null,
				 "submitted_by": null}
			};
*/


