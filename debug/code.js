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


let rcmd;

if (incmd.length===1) resolve("Task failed successfully.");

let ecmd = incmd.slice(1, incmd.length).join(" ");
try{
	rcmd = eval(ecmd);
}
catch(err){
	resolve(`error while evaulating expression: ${err}`);
	return;
}
//when called it as exec it won't print out the result of a normal operation
if (incmd[0] != "exec"){
	resolve(`result: ${rcmd}`);
} else {
	resolve("self-printing");
}
return;
});
}

