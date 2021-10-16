exports.noirelight2_command_code = function(fullmsg, unick, target_channel, target_context){
return new Promise (async (resolve, reject) => {

let cmdline, incmd, pingms="(unknown)", pingtext;

switch(target_context){
	case "twitch":
		cmdline = fullmsg.messageText.substr(1);	//full message excluding the prefix
		incmd 	= cmdline.split(" ");				//same but split
		try{
			pingms = await nlt.ss["twitch"].ping();
		}
		catch(err){
			//cosmetic err LULW
		}
		finally{
			pingtext = `TMI: ${pingms}`;
		}
		break;
	//placeholder for other contexts that may require extra handling Okayeg
	default:
		cmdline = fullmsg.substr(1);
		incmd	= cmdline.split(" ");
		pingtext = "unknown context: unknown LULWiguess ";
		break;
}

const LOG_NO	= 0;	//don't log
const LOG_WARN	= 2;	//log warnings and handled errors
const LOG_INFO	= 4;	//log more stuff
const LOG_DBG	= 8;	//log fucking everything WAYTOODANK

let uptime = nlt.util.getunixtime()-nlt.starttime;
let osload = nlt.os.loadavg();
let loadmsg = "";
let load_status = "";
let bpapi = "", bpping, stime;
if(osload[0] != 0){
	if(osload[0]>nlt.os.cpus().length)
		load_status = " (high";
	else
		load_status = " (low";
	let load_diff = 100-(osload[0]/osload[1]*100);
	if (load_diff>=10) load_status = load_status.concat(", ⬇️)");
	if (load_diff<=-10) load_status = load_status.concat(", ⬆️)");
	if (load_diff<10 && load_diff>-10) load_status = load_status.concat(", --)");
	//nlt.util.printtolog(LOG_DBG, `<debug> load_diff: ${load_diff}%`);
	loadmsg = `load: ${osload[0].toFixed(2)}/${osload[1].toFixed(2)}/${osload[2].toFixed(2)}${load_status}, `;
}
let cmds_used = nlt.msgqdb.selectQuery("SELECT id FROM cooldowns;").length;
if (nlt.channels[target_channel].bpapi === "none")
		bpapi = "(n/a)";
	else {
		if(nlt.channels[target_channel].links===1)
			bpapi = nlt.channels[target_channel].bpapi;	
		stime = new Date;
		try{
			await nlt.ss["twitch"].pbotBanphraseCheck(nlt.channels[target_channel].bpapi, "ping :)");
		}	
		catch(err){
			bpping="(error)";
		}
		if(!bpping){
			bpping=` (${new Date-stime} ms)`;
		}
		bpapi += bpping;
		
	}	

if (incmd[0] === "extping" || incmd[0] === "eping")
		resolve(`Pong! Mode: ${nlt.util.tlToStr(nlt.channels[target_channel].chmode)}, uptime: ${nlt.util.donktime(uptime)}, commands used (this session): ${cmds_used}, mem.usage: ${nlt.util.memusage()}, banphrase API: ${bpapi}, ${loadmsg}latency to ${pingtext}, cache: ${nlt.cache.stat(true).keyCount} keys, 💣: ${nlt.timebombs}, 🔃: ${nlt.restarts[target_context]}`);
	else 
		resolve(`Pong! Mode: ${nlt.util.tlToStr(nlt.channels[target_channel].chmode)}, uptime: ${nlt.util.donktime(uptime)}, commands used (this session): ${cmds_used}, latency to ${pingtext}. 💣: ${nlt.timebombs}, 🔃: ${nlt.restarts[target_context]} See ${nlt.c.cmd_prefix}eping for more stats`);
return;
})
}

