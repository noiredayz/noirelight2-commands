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
 
const wiby_url = "https://wiby.me/json/?q="; 
 
let sIndex, sText;

if (incmd.length === 1 || (incmd.length < 4 && incmd[1]==="-i")){
	resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `usage:  ${nlt.c.cmd_prefix}wiby <search term> or ${nlt.c.cmd_prefix}wiby -i <index> <search term>`});
	return;
}
if (incmd[1] === "-i"){
	if (incmd[2] === "random" ){
		sIndex = nlt.util.getRndInteger(0, 11);
	} else {
		if(isNaN(incmd[2])){
			resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `index must be an integer from 0 to 11 or "random"`});
			return;
		}
		sIndex = Number(incmd[2]);
		if (!Number.isInteger(sIndex) || (sIndex<0 || sIndex>11)){
			resolve({status: "failed", hasLink: false, setCooldown: "cmdfail", msg: `index must be an integer from 0 to 11 or "random"`});
			return;
		}
	}
	sText=incmd.slice(3).join("+");
} else {
	sIndex = 0;
	sText=incmd.slice(1).join("+");
}

nlt.got.get(`${wiby_url}${sText}`).json().then((retval) => {
	if(retval.length === 0){
		resolve({status: "failed", hasLink: false, setCooldown: "normal", msg: `wiby.me didn't find any webpages fitting your query`});
		return
	}
	else {	
		if(incmd[1] === "-i" && (sIndex > retval.length-1))
			sIndex = slb.util.getRndInteger(0, retval.length-1);	//rerolling index if the user specified a number larget than the max results
		resolve({status: "ok",
				 hasLink: true,
				 setCooldown: "normal",
				 msg: `your Web 1.0 page (from wiby.me ): ${retval[sIndex].URL} ${retval[sIndex].Title}`});	
		return;
	}	
		
}).catch((errVal) => {
	nlt.util.printtolog(4, `<wiby> Error while trying to search for ${sText}: ${errVal}`);
	reject({status: "errored", err: errVal});
});
return;

});
}

