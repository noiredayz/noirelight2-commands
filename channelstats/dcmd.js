/*
 * noirelight2 extra commands
 * AGPL3

*/

exports.noirelight2_command = {
	SAPI: 0.2,
	mname: "Channel stats",
	mdesc: "Channel statistics (name, pbot status etc)",
	cmdname: "channelstats",
	pipeable: 0,
	clearance: 0,
	errmsg: "cannot run command nam",
	nlt2_compatible: true,
	cooldowns: {
				global: 0,
				channel: 10,
				user: 10
				},
	minternal: 0,
	mgreenlist: 0,
	numeric_data: null,
	text_data: null,
	extra_modules: null,
	aliases: ["stat", "chstats", "stats"]
}

exports.nlt2_cmd_help = {
	shorthelp: "Usage: stats <target channel name> Displays information about a twitch channel",
	exthelp: "Usage: stats <target channel name> Displays information about a twitch channel"
}

