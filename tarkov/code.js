const {LOG_NO, LOG_DBG, LOG_INFO, LOG_WARN} = require(process.cwd()+"/lib/nlt-const.js");
const {printtolog, donktime, getunixtime} = require(process.cwd()+"/lib/nlt-tools.js");

const eftDatactrl	= "https://status.escapefromtarkov.com/api/datacenter/list";
const eftServices	= "https://status.escapefromtarkov.com/api/services";
const eftMessages	= "https://status.escapefromtarkov.com/api/message/list";
const eftClock 		= "https://status.escapefromtarkov.com/api/clock";


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

let retval = "", i, data=[[], [], [], 0];
try{
	data[0] = await nlt.got.get(eftDatactrl).json();
	data[1] = await nlt.got.get(eftServices).json();
	data[2] = await nlt.got.get(eftMessages).json();
	data[3] = await nlt.got.get(eftClock);
}
catch(err){
	printtolog(LOG_WARN, `<tarkov> HTTP error while trying to query the API: ${err}`);
}
if(data[0].length>0){
	retval += "Server(s): "
	for(i=0;i<data[0].length;i++){
		retval += data[0][i].name+" "+serverStatusToEmoji(data[0][i].status);
		if(i!=data[0].length-1) retval+= ", ";
		else retval += " ";
	}
}
if(data[1].length>0){
	retval += "Service status: ";
	for(i=0;i<data[1].length;i++){
		retval += data[1][i].name+" "+serverStatusToEmoji(data[1][i].status);
		if(i!=data[1].length-1) retval+= ", ";
		else retval += " ";
	}
}
let eftIssues = 0;
if(data[2].length>0){
	for(const g of data[2]){
		if(!g.solveTime) eftIssues++;
	}
	if(eftIssues===0){
		retval += "No actual, unresolved issues. Check website for past incidents. ";
	} else if (eftIssues===1){
		retval += "There is one unresolved issue. Check website for details and past incidents. ";
	} else {
		retval += `There are ${eftIssues} unresolved issues. Check website for details and past incidents. `;
	}
}
const retTime = Number(data[3].body);
retval += `(${donktime(getunixtime()-retTime)} ago) KKomrade 👉🏽 https://status.escapefromtarkov.com/`;
resolve(retval);


})
}

function serverStatusToEmoji(inStatus){
	switch(inStatus){
		case 0:
			return "🟢";
		case 1:
			return "🟡";
		case 2:
			return "🔴";
		default:
			return `(unknown - code ${inStatus})`;
	}
}

