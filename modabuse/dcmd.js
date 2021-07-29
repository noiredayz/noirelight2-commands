/*
 * noirelight2 template
 * CC-0 no rights reserved

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Mod abuse",
	mdesc: "SCROLL UP",
	cmdname: "modabuse",
	pipeable: 0,
	clearance: 3,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 1,
				channel: 1,
				user: 1
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: null
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: modabuse ban <user> <optional reason> or modabuse timeout <user> <time in seconds, 1s to 2w> <optional reason> Sometimes you just have to scroll up",
	exthelp: "Usage: modabuse ban <user> <optional reason> or modabuse timeout <user> <time in seconds, 1s to 2w> <optional reason> Sometimes you just have to scroll up"
}

