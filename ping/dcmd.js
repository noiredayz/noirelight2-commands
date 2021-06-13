/*
 * noirelight basic command
 * AGPL3-or-later

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Ping",
	mdesc: "The obligatory ping command",
	cmdname: "ping",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 10,
				user: 11
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["pong", "eping", "extping"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Ping the bot for some stats. Use eping for moar stats.",
	exthelp: "Ping the bot for some stats (mode, uptime, commands used, latency). Use eping for moar stats (memory use, CPU stats, banphrase API info)"
}

