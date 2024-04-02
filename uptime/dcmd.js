/*
 * noirelight2 extra commands
 * agpl3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Twitch uptime",
	mdesc: "Twitch channel uptime command",
	cmdname: "uptime",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 10,
				channel: 15,
				user: 15
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["live", "ut", "si", "streaminfo"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: uptime <username> Returns the current stream status of the specified Twitch channel.",
	exthelp: "Usage: uptime <username> Returns the current stream status of the specified Twitch channel."
}

