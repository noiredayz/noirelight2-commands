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
		reject("cannot run this command on unknown platforms");
		return;
		break;
}

if (incmd.length === 1) resolve(`usage: ${nlt.c.cmd_prefix}${incmd[0]} <filename>`);

let f;
let fLine;
let flCount = 0;

try{
	f = nlt.fs.readFileSync(`./bat/${incmd[1]}`);
}
catch(err){
	reject(`unable to read batch file: ${err.message}`);
	return;
}

let bFile = f.toString().split("\n");
if(bFile.length===0) resolve(`source file is empty eShrug`);

for(let i=0;i<bFile.length-1;i++){
	fLine = bFile[i].trim();
	if (fLine.substr(0,3).toLowerCase() != "rem" && fLine.length > 0){
		flCount++;
		nlt.ss[target_context].postmsg(target_channel, fLine);
	}
}

if (flCount === 0)
	resolve(`supplied batch file had no printable lines eShrug`);
 else
	resolve(`successfully printed ${flCount} lines from the batch file.`);
return;	
});
}

